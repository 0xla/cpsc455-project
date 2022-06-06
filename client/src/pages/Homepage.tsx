import ImageUpload from "../components/ImageUpload";
import Navigation from "../components/Navigation";
import Box from "@mui/material/Box";
import ImageCard from "../components/ImageCard";
import { images } from "../dummydata/imagesPlaceholder";


const Homepage = () => {
    return (
        <Box>
            <Box mt={5}>
                <Navigation />
                <ImageUpload />
            </Box>
            <Box mt={5}>
                {images.map((image: any, key) => (
                    <Box mt={2}>
                        <ImageCard imageData={image} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default Homepage;