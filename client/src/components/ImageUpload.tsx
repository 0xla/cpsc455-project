
import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
    display: "none",
});

const handleSubmit = async () => {};

const ImageUpload = () => {

    const [image, setImage] = useState(null);
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