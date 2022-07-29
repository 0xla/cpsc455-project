import ImageUpload from "../components/ImageUpload";
import TopNavigation from "../components/TopNavigation";
import ImageCard from "../components/ImageCard";
import { useEffect, useState } from "react";
import TabMenu from "../components/TabMenu";
import {
    selectUserData, setAuthToken,
    setFollowers, setFollowings, setUserId,
    setProfileImageUrl, setUserBio, 
    setUsername, setImages, selectAuthToken,
    setImageCategories
} from "../slices/userSlice"
import { UserDetails } from "../types";
import { useDispatch, useSelector } from "react-redux";
import "../App/App.css"
import { fetchUserData, followUser, unfollowUser } from "../util/functions";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../components/Popup";
import PieChart from "../components/PieChart";
import {decodeToken} from "react-jwt";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const UserPage = () => {
    const { username } = useParams();
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalTarget, setModalTarget] = useState("");
    const [showFollowUpdateButton, setShowFollowUpdateButton] = useState(true);
    const [option, setOption] = useState(0);
    const [followAction, setFollowAction] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let authToken = useSelector(selectAuthToken);
    let userData = useSelector(selectUserData);
    let decodedToken : any;
    let loggedInUserData: any;
    let followersList : any;
    let followingsList : any;
    
    useEffect(() => {

        if (authToken === undefined) {
            const token: string | null = window.localStorage.getItem("authToken");
            if (token) {
                dispatch(setAuthToken(token));
                authToken = token;
            } else {
                navigate("/")
            }
        }

        async function getUserData() {

            let response;
            try {
                if (username) {
                    response = await fetchUserData(username);
                }
                if (!response.data[0]) {
                    navigate('/path-not-found')
                }
                const { _id, images, followers, followings, profilePicture, bio, imageCategories } = response.data[0];
                dispatch(setImages(images));
                dispatch(setUsername(username));
                dispatch(setUserId(_id));
                dispatch(setUserBio(bio));
                dispatch(setFollowers(followers));
                dispatch(setFollowings(followings));
                dispatch(setProfileImageUrl(profilePicture));
                dispatch(setImageCategories(imageCategories));

            } catch (err) {
                console.log(err);

            }
        }
        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    
    
    useEffect(() => {
        decodedToken = decodeToken(authToken);
        if(decodedToken){
            setShowFollowUpdateButton(decodedToken.id === userData.userId);
        }
        const checkFollow = () => {
            if (userData["followers"].length > 0) {
                const followersListOfUserById = userData["followers"].map((element: any) => element.id)
                if(followersListOfUserById.includes(decodedToken.id)){
                    console.log("inside here")
                    setFollowAction(false);
                }
            }
        }
        checkFollow()
    })

    // useEffect(() => {
        
    // })

    // useEffect(() => {
    //     async function getUserData() {

    //         let response;
    //         try {
    //             if (username) {
    //                 response = await fetchUserData(username);
    //             }
    //             if (!response.data[0]) {
    //                 navigate('/path-not-found')
    //             }
    //             const { followers, followings } = response.data[0];
    //             dispatch(setFollowers(followers));
    //             dispatch(setFollowings(followings));

    //         } catch (err) {
    //             console.log(err);

    //         }
    //     }
    //     getUserData();
        
    // })

    
    const optionChange = (_event: any, selected: number) => {
        setOption(selected);
    };

    const handleFollow = async () => {
        let response;
        if(followAction){
            response = await followUser({loggedInUserId: decodedToken.id, currentUserId: userData.userId});
        }
        else {
            response = await unfollowUser({loggedInUserId: decodedToken.id, currentUserId: userData.userId});
        }
        console.log(response.status);
        if(response.status === 200){
            window.location.reload();
        }
    }

    return (
        <div className="bg-[#FAFAFA] ">
            <div>
                <TopNavigation />
                <div className="flex lg:flex-row flex-col lg:gap-0 gap-[30px] justify-center items-center lg:mx-0 mx-[10vw]">
                    <div className="flex flex-col lg:mr-[100px] p-2">
                        {
                            userData.profileImageUrl !== '' ? 
                            <img className="flex-none md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full p-2" alt={userData.profileImageUrl} src={userData.profileImageUrl} /> 
                                : <img className="flex-none md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full p-2" alt="defaultProfileImage" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" />
                        }
                        </div>
                    <div className="flex flex-col gap-[15px] lg:mr-[100px] mr-[0px] p-2">
                        <div className="flex flex-row gap-[30px]">
                            <div className="text-xl">
                                {username}
                            </div>
                            {!showFollowUpdateButton &&
                                (<button 
                                    className="border-[2px] py-[0.5px] px-[5px] border-gray-400 rounded hover:cursor-pointer text-base font-medium"
                                    onClick={()=>handleFollow()}
                                >
                                    {followAction === true ? "Follow": "Unfollow"}
                            </button>)}
                        </div>
                        <div className="flex flex-row gap-[50px]">
                            <div className="">
                                <span className="font-bold">{userData.images.length}</span> posts
                            </div>
                            <button className="" id="followers"
                                onClick={() => {
                                    setModalTarget("followers");
                                    setShowModal(true)
                                }}>
                                <span className="font-bold">{userData.followers.length}</span> followers
                            </button>
                            <button className="" id="followings"
                                onClick={() => {
                                    setModalTarget("followings");
                                    setShowModal(true)
                                }} >
                                <span className="font-bold">{userData.followings.length}</span> following
                            </button>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-bold">Anagram's {username}</span>
                            <div>{userData.userBio}</div>
                        </div>
                    </div>
                    { showFollowUpdateButton && <ImageUpload setIsUploadingImage={setIsUploadingImage}/>}

                </div>
                </div>
                {isUploadingImage && <div className="flex justify-center items-center">
                    <CircularProgress />
                </div>}
                <div className="mt-2">
                    <TabMenu option={option} optionChange={optionChange} />
                </div>
            {option===0 ? <div className="mt-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-10 grid-cols-1 mx-[10vw]">
                {userData.images.map((image: any) => (
                        <div className="mt-2">
                            <ImageCard imageData={image} />
                        </div>
                        )
                    )}
                    </div> : <div className="flex items-center justify-center md:my-8 md:p-4">
                                <PieChart />
                        </div>}

            <Popup onClose={() => setShowModal(false)} visible={showModal} target={modalTarget} userData={userData} />
        </div>
    );
}

export default UserPage;