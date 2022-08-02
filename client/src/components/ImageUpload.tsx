import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { uploadImage } from "../util/functions";
import { addImage, addImageCategories, selectAuthToken } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import toast from "toast-me";

const Input = styled("input")({
    display: "none",
});

const ImageUpload = ({ setIsUploadingImage }:
    { setIsUploadingImage: (value: boolean) => void }) => {

    const dispatch = useDispatch();
    const authToken = useSelector(selectAuthToken);

    const handleSubmit = async () => {
        console.log(image);
        if (image !== undefined && authToken) {
            setIsUploadingImage(true);
            const formData = new FormData();
            formData.append("file", image);

            try {
                const imageData = await uploadImage(formData, authToken);
                if (imageData) {
                    setImage(undefined);
                    dispatch(addImage(imageData.image));
                    dispatch(addImageCategories(imageData.imageLabels));
                    toast("Image uploaded successfully!");
                }
            } catch (err: any) {
                toast("Image failed to upload. Please try again later!")
            } finally {
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
                        console.log(e.target.files[0])
                        setImage(e.target.files[0]);
                        e.target.value = null;
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