import ImageUpload from "../components/ImageUpload";
import Navigation from "../components/Navigation";
import Box from "@mui/material/Box";
import ImageCard from "../components/ImageCard";
import { useState } from "react";
import TabMenu from "../components/TabMenu";
import {
    selectUserData
} from "../slices/userSlice"
import { UserDetails } from "../types";
import { useSelector } from "react-redux";


const Homepage = () => {
    const userData: UserDetails = useSelector(selectUserData);

    const { images, username, userBio, profileImageUrl } = userData;

    const [option, setOption] = useState(0);

    const optionChange = (_event: any, selected: number) => {
        setOption(selected);
    };
    return (
        <Box>
            <Box mt={5}>
                <Navigation />
                <ImageUpload />
                <Box mt={2}>
                    <TabMenu option={option} optionChange={optionChange} />
                </Box>
            </Box>
            <Box mt={5}>
                {option === 0 && images.map((image: any) => (
                    <Box mt={2}>
                        <ImageCard imageData={image} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default Homepage;