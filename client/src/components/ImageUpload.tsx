import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { uploadImage } from "../util/functions";
import { addImage, addImageCategories, selectAuthToken } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Input = styled("input")({
    display: "none",
});

const ImageUpload = ({ setIsUploadingImage }: 
    { setIsUploadingImage: (value: boolean) => void }) => {

    const dispatch = useDispatch();
    const authToken = useSelector(selectAuthToken);


    const handleSubmit = async () => {
        setIsUploadingImage(true);
        if (image !== undefined && authToken) {
            const formData = new FormData();
            formData.append("file", image);
            const imageData = await uploadImage(formData, authToken);

            if (imageData) {
                setImage(undefined);
                dispatch(addImage(imageData.image));
                dispatch(addImageCategories(imageData.imageLabels));
                setIsUploadingImage(false);
            }
        }
    }

    const [image, setImage] = useState<any>(undefined);
    return (
        <div>
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
            <div className="p-2">
                <Button onClick={handleSubmit} variant="outlined">
                    Upload
                </Button>
            </div>
        </div>
    );
}

export default ImageUpload;