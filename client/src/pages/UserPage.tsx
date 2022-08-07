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
    setImageCategories, setFeedImages
} from "../slices/userSlice"
import { UserDetails } from "../types";
import { useDispatch, useSelector } from "react-redux";
import "../App/App.css"
import { fetchUserData } from "../util/functions";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../components/Popup";
import PieChart from "../components/PieChart";
import {decodeToken} from "react-jwt";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import {base_be_url} from "../util/constants";
import Typography from "@mui/material/Typography";
import SuggestedUserCard from "../components/SuggestedUserCard";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import ProfilePicturePopup from "../components/ProfilePicturePopup";

const UserPage = () => {
    const { username } = useParams();
    const [loggedInUserProfilePicture, setLoggedInUserProfilePicture] = useState("");
    const [suggestedUsersToFollow, setSuggestedUsersToFollow] = useState([]);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isProfilePictureUpload, setIsProfilePictureUpload] = useState(false);
    const [modalTarget, setModalTarget] = useState("");
    const [option, setOption] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let authToken = useSelector(selectAuthToken);
    let userData: UserDetails = useSelector(selectUserData);
    // @ts-ignore
    const loggedInUserId = decodeToken(localStorage.getItem("authToken")).id
    // @ts-ignore
    const loggedInUsername = decodeToken(localStorage.getItem("authToken")).username

    // @ts-ignore
    const loggedInProfilePicture = decodeToken(localStorage.getItem("authToken")).profilePicture;

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
                setOption(0);



                const loggedInUserData = await axios.get(`${base_be_url}/api/users/${loggedInUserId}`)
                const loggedInProfilePicture = loggedInUserData.data.data.profilePicture;
               setLoggedInUserProfilePicture(loggedInProfilePicture);

                const res = await axios.get(
                    `${base_be_url}/api/images/following/${loggedInUserId}`
                )
                dispatch(setFeedImages(res.data.data));

                const result = await axios.get(
                    `${base_be_url}/api/users?limit=40`
                )

                const suggestedFollowing = result.data.data.filter( (user: any) => {
                    return user.username !== loggedInUsername && user.images.length !== 0;
                })
                setSuggestedUsersToFollow(suggestedFollowing);
            } catch (err) {
                console.log(err);
            }
        }
        getUserData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const optionChange = (_event: any, selected: number) => {
        setOption(selected);
    };

    const handleFollow = async () => {
        if (userData.followers.filter(follower => follower.id === loggedInUserId).length > 0) {
            try {
                const res = await axios.put(
                    `${base_be_url}/api/users/${loggedInUserId}/unfollows/${userData.userId}`, {
                        unfollowingUsername: loggedInUsername,
                        unfollowedUsername: userData.username,
                    }
                )
                dispatch(setFollowers(res.data.followerData));

            } catch (err: any) {
                console.log("Error unfollowing user.")
            }
        } else {
            try {
                const res = await axios.put(
                    `${base_be_url}/api/users/${loggedInUserId}/follows/${userData.userId}`, {
                        followingUsername: loggedInUsername ,
                        followedUsername: userData.username,
                    }
                )
                dispatch(setFollowers(res.data.followerData));

            } catch (err: any) {
                console.log("Error following user.")
            }
        }
    }

    return (
        <div className="bg-[#FAFAFA] h-auto">
            <div className="h-auto">
                <TopNavigation loggedInUserProfilePicture={loggedInUserProfilePicture} />
                <div className="flex lg:flex-row flex-col lg:gap-0 gap-[30px] justify-center items-center lg:mx-0 mx-[10vw]">
                    <div className="flex flex-col lg:mr-[100px] p-2">
                        {
                            userData.profileImageUrl !== '' ? 
                            <img className="flex-none md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full p-2"
                                 alt={userData.profileImageUrl} src={userData.profileImageUrl} />
                                : <img className="flex-none md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full p-2"
                                      />
                        }
                        {loggedInUserId === userData.userId &&
                            <button onClick={()=>setIsProfilePictureUpload(!isProfilePictureUpload)}>
                            Upload Profile Picture
                        </button>}
                        {isProfilePictureUpload &&
                            <ImageUpload setIsUploadingImage={setIsUploadingImage}
                                         isProfilePictureUpload={isProfilePictureUpload}
                                         setIsProfilePictureUpload={setIsProfilePictureUpload} setLoggedInUserProfilePicture={setLoggedInUserProfilePicture}></ImageUpload>}
                        {isUploadingImage && isProfilePictureUpload&& <div className="flex justify-center items-center">
                            <CircularProgress />
                        </div>}
                        </div>
                    <div className="flex flex-col gap-[15px] lg:mr-[100px] mr-[0px] p-2">
                        <div className="flex flex-row gap-[30px]">
                            <div className="text-xl">
                                {username}
                            </div>
                            {loggedInUserId !== userData.userId &&
                                <div className=" border-[2px] py-[0.5px] px-[5px] border-gray-400 rounded
                                hover:cursor-pointer text-base font-medium" onClick={()=>handleFollow()}>
                                {userData.followers.filter(follower => follower.id === loggedInUserId).length > 0 ? "Unfollow" : "Follow"}
                            </div>}
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
                                <span className="font-bold">{userData.followers.length}</span>
                                {userData.followers.length === 1 ? " follower" : " followers"}
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
                    { loggedInUserId === userData.userId && <ImageUpload setIsUploadingImage={setIsUploadingImage} isProfilePictureUpload={isProfilePictureUpload} setIsProfilePictureUpload={setIsProfilePictureUpload} setLoggedInUserProfilePicture={setLoggedInUserProfilePicture}/>}

                </div>
                </div>
                {isUploadingImage && !isProfilePictureUpload&& <div className="flex justify-center items-center">
                    <CircularProgress />
                </div>}
                <div className="mt-2">
                    <TabMenu option={option} optionChange={optionChange} username ={username} />
                </div>
            {option===0  &&
                <div className="mt-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-10 grid-cols-1 mx-[10vw]">
                {userData.images.map((image: any) => (
                        <div key={image.id} className="mt-2">
                            <ImageCard isFeed={false} imageData={image} />
                        </div>
                        )
                    )}
                    </div>
            }
            {option === 1 &&
                <div className="flex items-center justify-center md:my-8 md:p-4">
                    <PieChart/>
                </div>
            }
            {option === 2 &&
                <div className="mt-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-10 grid-cols-1 mx-[10vw]">
                    {loggedInUsername === username && option === 2 && userData.feedImages.map((imageObj: any)=> (
                        <div key={imageObj.id} className="mt-2">
                            <ImageCard isFeed={true} imageData={imageObj} />
                        </div>
                    ))}
                </div>
            }
            {userData.feedImages.length === 0 && option === 2 && loggedInUsername === username &&
                <Typography fontWeight="bold">Suggested Users to Follow</Typography>}
            {userData.feedImages.length === 0 && option === 2 && loggedInUsername === username &&
                <div className="mt-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-10 grid-cols-1 mx-[10vw]">
                {suggestedUsersToFollow.map((suggestedUserData) => {
                    // @ts-ignore
                    return <div>
                        <SuggestedUserCard suggestedUserData={suggestedUserData}></SuggestedUserCard>
                    </div>
                })}
            </div>
            }
            <Popup onClose={() => setShowModal(false)} visible={showModal} target={modalTarget} userData={userData} />
        </div>
    );
}

export default UserPage;