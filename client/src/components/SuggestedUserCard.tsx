import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {Card, Typography} from "@mui/material";

const SuggestedUserCard = ({suggestedUserData}: { suggestedUserData: any, }) => {
    const navigate = useNavigate();
    const navigateToUser = (username: string) => {
        navigate(`/${username}`)
    }

    return (
            <Card style={{cursor: 'pointer'}} onClick={() => navigateToUser(suggestedUserData.username)} sx={{
                width: 250
            }}>
                <div className="flex">
                    <label className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img onClick={() => navigateToUser(suggestedUserData.username)} alt="profile-pic" src="https://api.lorem.space/image/face?hash=33791" />
                        </div>
                    </label>
                        <Button onClick={() => navigateToUser(suggestedUserData.username)} style={{textTransform: 'none', color: "black",backgroundColor: 'transparent'}}>
                            <Typography style={{ fontSize: "0.8rem" }} fontWeight="bold" >
                                {suggestedUserData.username}
                            </Typography>
                        </Button>
                </div>
            </Card>
    )
}

export default SuggestedUserCard