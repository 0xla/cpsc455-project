import ImageUpload from "../components/ImageUpload";
import Navigation from "../components/Navigation";
import Avatar from '@mui/material/Avatar';
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
        <Box>
            <Box mt={5}>
            <Navigation />
                <div className="flex flex-row justify-center items-center gap-20 p-4">
                    <Box className="ProfilePic flex flex-col justify-center items-center">
                        <img className="md:w-[15vw] md:h-[15vw] w-[100px] h-[100px] rounded-full p-2" alt="Remy Sharp" src={profileImageUrl} />
                        <div className=" ">{userBio}</div>
                        
                    </Box>
                    <ImageUpload />
                </div>
               
               
                
                <Box className="mt-2">
                    <TabMenu option={option} optionChange={optionChange} />
                </Box>
            </Box>
            <Box className="mt-5 grid md:grid-cols-4 gap-5 p-10 grid-cols-1">
                {option === 0 && images.map((image: any) => (
                    <Box className="mt-2">
                        <ImageCard imageData={image} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default Homepage;