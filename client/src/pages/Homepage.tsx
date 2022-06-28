import ImageUpload from "../components/ImageUpload";
import Navigation from "../components/Navigation";
import TopNavigation from "../components/TopNavigation";
import Box from "@mui/material/Box";
import ImageCard from "../components/ImageCard";
import { useState } from "react";
import TabMenu from "../components/TabMenu";
import {
    selectUserData
} from "../slices/userSlice"
import { UserDetails } from "../types";
import { useSelector } from "react-redux";
import "../App/App.css"


const Homepage = () => {
    const userData: UserDetails = useSelector(selectUserData);

    const { images, username, userBio, profileImageUrl } = userData;

    const [option, setOption] = useState(0);

    const optionChange = (_event: any, selected: number) => {
        setOption(selected);
    };
    // sx={{width: 50, height: 50}}
    return (
        <div className="bg-[#FAFAFA] ">
            <div>
                <TopNavigation />
                <div className="flex flex-row items-center mx-[10vw]">
                    <div className="flex flex-col mr-[100px]">
                        <img className="flex-none md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full p-2" alt="Remy Sharp" src={profileImageUrl} />
                    </div>
                    <div>
                        {/* put followers following */}
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