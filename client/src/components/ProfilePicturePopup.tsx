import {Dialog, Modal} from "@mui/material";
import {useState} from "react";
import ImageUpload from "./ImageUpload";
import ProfilePictureUpload from "./ProfilePictureUpload";

const ProfilePicturePopup = ({open, setClose} : {open: any, setClose: any}) => {
    const [isUploadingImage, setIsUploadingImage] = useState(false);

const handleClose = () => {
    setClose(false);
    }

    return (
        <div>
            {/*<Modal open={open} onClose={handleClose}>*/}
            {/*    <ImageUpload setIsUploadingImage={setIsUploadingImage}/>*/}

            {/*</Modal>*/}


        </div>
    )
}

export default ProfilePicturePopup