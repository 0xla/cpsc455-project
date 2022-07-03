import ImageUpload from "../components/ImageUpload";
import TopNavigation from "../components/TopNavigation";
import ImageCard from "../components/ImageCard";
import TabMenu from "../components/TabMenu";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { getUser } from "../slices/userSlice";
import { SliceState } from "../types";
// import { UserDetails } from "../types";
import "../App/App.css"


const Homepage = () => {
    const userState: SliceState = useSelector( (state:any) => state.user);
    const { loading, error, userData } = userState;
    // const { images, username, userBio, profileImageUrl } = userData;
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log("inside use effect");
        dispatch(getUser({id: "62a29ba356adf46644510688"}));
      },[]);

    const [option, setOption] = useState(0);
    console.log("userdata", userData);
    // const name : string = "user name";

    const optionChange = (_event: any, selected: number) => {
        setOption(selected);
    };

    if (loading) return <p>Loading...</p>

    return (
        <div className="bg-[#FAFAFA] ">
            <div>
                <TopNavigation />
                <div className="flex flex-row items-center mx-[10vw]">
                    <div className="flex flex-col mr-[100px] p-2">
                        <img className="flex-none md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full p-2" alt={userData.username+"'s picture"} src={userData.profilePicture} />
                    </div>
                    <div className="flex flex-col items-start gap-[15px] mr-[100px]">
                        <div className="flex flex-row gap-[30px]">
                            <div className="text-xl">
                                {userData.username}
                            </div>
                            <div className="border-[2px] py-[0.5px] px-[5px] border-gray-400 rounded hover:cursor-pointer text-base font-medium">
                                Follow
                            </div>
                        </div>
                        <div className="flex flex-row gap-[50px]">
                            <div className="">
                                <span className="font-bold">50</span> posts
                            </div>
                            <div className="">
                                <span className="font-bold">{userData.followers.length}</span> followers
                            </div>
                            <div className="">
                                <span className="font-bold">{userData.followings.length}</span> following 
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-bold">Instagram's {userData.username}</span>
                            <div>{userData.bio}</div>
                        </div>
                    </div>
                    <ImageUpload />

                </div>
                <div className="mt-2">
                    <TabMenu option={option} optionChange={optionChange} />
                </div>
            </div>
            <div className="mt-5 grid md:grid-cols-2 gap-5 p-10 grid-cols-1 mx-[10vw]">
                {/* {option === 0 && images.map((image: any) => (
                    <div className="mt-2">
                        <ImageCard imageData={image} />
                    </div>
                ))} */}
            </div>
        </div>
    );
}

export default Homepage;