import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {Card} from "@mui/material";

const SuggestedUserCard = ({suggestedUserData}: { suggestedUserData: any, }) => {
    const navigate = useNavigate();
    const navigateToUser = (username: string) => {
        navigate(`/${username}`)
    }

    return (
        <div >
            <Card>
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="profile-pic" src="https://api.lorem.space/image/face?hash=33791" />
                        </div>
                    </label>
                        <Button onClick={() => navigateToUser(suggestedUserData.username)} style={{textTransform: 'none',}}>
                            {suggestedUserData.username}
                        </Button>
            </Card>
        </div>

    )
}

export default SuggestedUserCard