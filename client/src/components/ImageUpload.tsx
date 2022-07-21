
import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { uploadImage } from "../util/functions";
import { addImage } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthToken } from "../slices/userSlice";

const Input = styled("input")({
    display: "none",
});

const ImageUpload = () => {

    const dispatch = useDispatch();
    const authToken = useSelector(selectAuthToken);


    const handleSubmit = async () => {

        if (image !== undefined && authToken) {
            const formData = new FormData();
            formData.append("file", image);
            const imageData = await uploadImage(formData, authToken);
            if (imageData) {
                setImage(undefined);
                console.log(`image url: ${imageData.url}`);
                dispatch(addImage(imageData));
            }
        }
    }

    const [image, setImage] = useState<any>(undefined);
    return (
        <Box>
            <label htmlFor="icon-button-file">
                <Input
                    onChange={(e: any) => {
                        setImage(e.target.files[0]);
                    }}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                />
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <PhotoCamera />
                </IconButton>
                <p>{image ? image.name : ""}</p>
            </label>
            <Box padding={2}>
                <Button onClick={handleSubmit} variant="outlined">
                    Upload
                </Button>
            </Box>
        </Box>
    );
}

export default ImageUpload;