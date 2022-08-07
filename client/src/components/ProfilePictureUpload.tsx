import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import axios from "axios";
import {base_be_url} from "../util/constants";
import {decodeToken} from "react-jwt";

const ProfilePictureUpload = () => {
    const Input = styled("input")({
        display: "none",
    });

    // @ts-ignore
    const loggedInUserId = decodeToken(localStorage.getItem("authToken")).id

    const [image, setImage] = useState<any>(undefined);

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "ladhoeso")
        const res = await axios.post("https://api.cloudinary.com/v1_1/dhp7dbfmf/image/upload", formData);
        const imageUrl = res.data.url;
        await axios.post(`${base_be_url}/api/${loggedInUserId}/images/profile`, {
                imageURL: imageUrl
            }
            )
    }


    return (
        <div>
            <div>
                <label htmlFor="icon-button-file">
                    <Input
                        onChange={(e: any) => {
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
        </div>
    )

}

export default ProfilePictureUpload