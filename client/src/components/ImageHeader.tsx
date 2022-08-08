import {Button, Typography} from "@mui/material"
import {useNavigate} from "react-router-dom";

const ImageHeader = ({username, profilePicture}: {username: String, profilePicture: string}) => {
    const navigate = useNavigate();
    const navigateToUser = (username: String) => {
        navigate(`/${username}`)
    }
    return (
        <div className="flex">
            <label className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img onClick={() => navigateToUser(username)} alt="profile-pic" src={profilePicture} />
                </div>
            </label>
            <Button onClick={() => navigateToUser(username)}
                    style={{textTransform: 'none', color: "black",backgroundColor: 'transparent'}}>
                <Typography style={{ fontSize: "0.8rem" }} fontWeight="bold" >
                    {username}
                </Typography>

            </Button>
        </div>
    )
}

export default ImageHeader