import {Button} from "@mui/material"
import {useNavigate} from "react-router-dom";

const ImageHeader = ({username}: {username: String}) => {
    const navigate = useNavigate();
    const navigateToUser = (username: String) => {
        navigate(`/${username}`)
    }
    return (
        <div className="flex">
            <label className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img onClick={() => navigateToUser(username)} alt="profile-pic" src="https://api.lorem.space/image/face?hash=33791" />
                </div>
            </label>
            <Button onClick={() => navigateToUser(username)}
                    style={{textTransform: 'none', color: "black",backgroundColor: 'transparent'}}>
                {username}
            </Button>
        </div>
    )
}

export default ImageHeader