import Box from "@mui/material/Box";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from "@mui/material/Typography";
import axios from "axios";
import {setFeedImages} from "../slices/userSlice";
import {useDispatch} from "react-redux";
import {decodeToken} from "react-jwt";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {base_be_url} from "../util/constants";


// @ts-ignore
export default function ImageFeedCard({imageData}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // @ts-ignore
    const loggedInUserId = decodeToken(localStorage.getItem("authToken")).id

    const handleLike = async (postId: string, loggedInUserId: string) => {
        let result: any;
        if (imageData.likes.includes(loggedInUserId)) {
            try {
                await axios.delete(
                    `${base_be_url}/api/posts/${postId}/likes/${loggedInUserId}`,
                );
            } catch (err) {
                console.log("Error unliking post.")
            }
        } else {
            try {
                await axios.put(
                    `${base_be_url}/api/posts/${postId}/likes/${loggedInUserId}`,
                );
            } catch (err: any) {
                console.log("Error liking post.")
            }
        }
        try {
            result = await axios.get(
                `${base_be_url}/api/images/following/${loggedInUserId}`
            )
        } catch (err) {
            console.log("Error getting following images.")
        }
        dispatch(setFeedImages(result.data.data));
    }

    const navigateToUser = (username: string) => {
        navigate(`/${username}`)
    }

    return (
        <div className="card w-auto bg-base-100 shadow-xl">
            <Button onClick={() => navigateToUser(imageData.username)}
                    style={{textTransform: 'none', fontSize: "20px"}}>{imageData.username}</Button>

            <figure><img src={imageData.url} alt={imageData.id}/></figure>
            <Box sx={{paddingTop: 5, paddingLeft: 5, display: 'flex',}}>

                {imageData.likes.includes(loggedInUserId) ?
                    <FavoriteIcon fontSize="large" style={{color: 'rgb(255,0,0)'}}
                                  onClick={() => handleLike(imageData.id, loggedInUserId)}/>
                    : <FavoriteBorderIcon fontSize="large" sx={{"&:hover": {color: "gray"}}}
                                          onClick={() => handleLike(imageData.id, loggedInUserId)}/>}
            </Box>
            <Typography align="left" sx={{paddingTop: 1, paddingLeft: 6}}>{imageData.likes.length}
                {imageData.likes.length === 1 ? " like" : " likes"} </Typography>
            <div className="card-body">
                <p>{imageData.description}</p>

            </div>
        </div>
    );
}