import ImageUpload from "../components/ImageUpload";
import TopNavigation from "../components/TopNavigation";
import ImageCard from "../components/ImageCard";
import { useEffect, useState } from "react";
import TabMenu from "../components/TabMenu";
import {
    selectUserData
} from "../slices/userSlice"
import { UserDetails } from "../types";
import { useDispatch, useSelector } from "react-redux";
import "../App/App.css"
import { fetchUserData } from "../util/functions";
import {setUsername, setImages } from "../slices/userSlice";


const Homepage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        async function getUserData() {

            try {
                const response = await fetchUserData();
                const { username, images } = response.data;

                dispatch(setUsername(username));
                dispatch(setImages(images));
            } catch (err) {
                console.log(err);

            }
        }
        getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const userData: UserDetails = useSelector(selectUserData);

    const { images, username, userBio, profileImageUrl } = userData;
    const [option, setOption] = useState(0);

    const optionChange = (_event: any, selected: number) => {
        setOption(selected);
    };
    return (
        <div className="bg-[#FAFAFA] ">
            <div>
                <TopNavigation />
                <div className="flex flex-row items-center mx-[10vw]">
                    <div className="flex flex-col mr-[100px] p-2">
                        <img className="flex-none md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full p-2" alt="Remy Sharp" src={profileImageUrl} />
                    </div>
                    <div className="flex flex-col items-start gap-[15px] mr-[100px]">
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
                                <span className="font-bold">50</span> posts
                            </div>
                            <div className="">
                                <span className="font-bold">1.2M</span> followers
                            </div>
                            <div className="">
                                <span className="font-bold">5K</span> following
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-bold">Instagram's {username}</span>
                            <div>{userBio}</div>
                        </div>
                    </div>
                    <ImageUpload />

                </div>
                <div className="mt-2">
                    <TabMenu option={option} optionChange={optionChange} />
                </div>
            </div>
            <div className="mt-5 grid md:grid-cols-2 gap-5 p-10 grid-cols-1 mx-[10vw]">
                {option === 0 && images.map((image: any) => (
                    <div className="mt-2">
                        <ImageCard imageData={image} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Homepage;