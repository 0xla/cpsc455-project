import ImageUpload from "../components/ImageUpload";
import TopNavigation from "../components/TopNavigation";
import ImageCard from "../components/ImageCard";
import { useEffect, useState } from "react";
import TabMenu from "../components/TabMenu";
import {
    selectUserData, setAuthToken,
    setFollowers, setFollowings, setUserId,
    setProfileImageUrl, setUserBio
} from "../slices/userSlice"
import { UserDetails } from "../types";
import { useDispatch, useSelector } from "react-redux";
import "../App/App.css"
import { fetchUserData } from "../util/functions";
import { setUsername, setImages, selectAuthToken } from "../slices/userSlice";
import { useNavigate,useParams } from "react-router-dom";
import Popup from "../components/Popup";

const UserPage = () => {
    const {username} = useParams();
    const [showModal, setShowModal] = useState(false);
    const [modalTarget, setModalTarget] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let authToken = useSelector(selectAuthToken);


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
                if(username) {
                    response = await fetchUserData(username);
                }
                if(!response.data[0]){
                    navigate('/path-not-found')
                }
                const {_id, images, followers, followings, profilePicture,bio} = response.data[0];
                dispatch(setImages(images));
                dispatch(setUsername(username));
                dispatch(setUserId(_id));
                dispatch(setUserBio(bio));
                dispatch(setFollowers(followers));
                dispatch(setFollowings(followings));
                dispatch(setProfileImageUrl(profilePicture));
            } catch (err) {
                console.log(err);

            }
        }
        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const userData: UserDetails = useSelector(selectUserData);


    const [option, setOption] = useState(0);
    const optionChange = (_event: any, selected: number) => {
        setOption(selected);
    };

    // const openPopup = () => {
    //     setShowFollowers(true);
    //     return <Popup />
    // }
    return (
        <div className="bg-[#FAFAFA] ">
            <div>
                <TopNavigation />
                <div className="flex lg:flex-row flex-col lg:gap-0 gap-[30px] justify-center items-center lg:mx-0 mx-[10vw]">
                    <div className="flex flex-col lg:mr-[100px] p-2">
                        <img className="flex-none md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full p-2" alt={userData.profileImageUrl} src={userData.profileImageUrl} />
                    </div>
                    <div className="flex flex-col gap-[15px] lg:mr-[100px] mr-[0px] p-2">
                        <div className="flex flex-row gap-[30px]">
                            <div className="text-xl">
                                {username}
                            </div>
                            <div className="border-[2px] py-[0.5px] px-[5px] border-gray-400 rounded hover:cursor-pointer text-base font-medium">
                                Follow
                            </div>
                        </div>
                        <div className="flex flex-row gap-[50px]">
                            <div className="">
                                <span className="font-bold">{userData.images.length}</span> posts
                            </div>
                            <button className="" id="followers"
                                    onClick={() => {
                                        setModalTarget("followers");
                                        setShowModal(true)}}>
                                <span className="font-bold">{userData.followers.length}</span> followers
                            </button>
                            <button className="" id="followings"
                                    onClick={() => {
                                        setModalTarget("followings");
                                        setShowModal(true)}} >
                                <span className="font-bold">{userData.followings.length}</span> following
                            </button>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-bold">Instagram's {username}</span>
                            <div>{userData.userBio}</div>
                        </div>
                    </div>
                    <ImageUpload />

                </div>
                <div className="mt-2">
                    <TabMenu option={option} optionChange={optionChange} />
                </div>
            </div>
            <div className="mt-5 grid md:grid-cols-2 gap-5 p-10 grid-cols-1 mx-[10vw]">
                {option === 0 && userData.images.map((image: any) => (
                    <div className="mt-2">
                        <ImageCard imageData={image} />
                    </div>
                ))}
            </div>
            <Popup onClose={() => setShowModal(false)} visible={showModal} target={modalTarget} userData={userData}/>
        </div>
    );
}

export default UserPage;