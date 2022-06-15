import ImageUpload from "../components/ImageUpload";
import Navigation from "../components/Navigation";
import Box from "@mui/material/Box";
import ImageCard from "../components/ImageCard";
import { images } from "../dummydata/imagesPlaceholder";
import { useState } from "react";
import TabMenu from "../components/TabMenu";


const Homepage = () => {
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
                {option === 0 && images.map((image: any, key) => (
                    <Box mt={2}>
                        <ImageCard imageData={image} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default Homepage;