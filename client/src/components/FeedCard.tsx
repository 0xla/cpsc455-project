import { ImageData } from "../types";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from "@mui/material/Typography";
import axios from "axios";
import {setImages} from "../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {decodeToken} from "react-jwt";


// @ts-ignore
export default function FeedCard({ imageData, username, setFeedImages, following }) {
    const dispatch = useDispatch();

    // @ts-ignore
    const loggedInUserId = decodeToken(localStorage.getItem("authToken")).id

    const handleLike = async (postId: string, loggedInUserId: string) => {
        if (imageData.likes.includes(loggedInUserId)) {
            try {
                const res = await axios.delete(
                    `http://localhost:5000/api/posts/${postId}/likes/${loggedInUserId}`,
                );
                console.log(res.data.data)
                const result = await axios.post(
                    `http://localhost:5000/api/images`, {
                        followingArr: following
                    }
                )
               setFeedImages(result.data.data)
            } catch (err: any) {
                console.log("Error unliking post.")
            }
        } else {
            try {
                const res = await axios.put(
                    `http://localhost:5000/api/posts/${postId}/likes/${loggedInUserId}`,
                );
                console.log(res.data.data)
                const result = await axios.post(
                    `http://localhost:5000/api/images`, {
                        followingArr: following
                    }
                )
                setFeedImages(result.data.data)

            } catch (err: any) {
                console.log("Error liking post.")
            }
        }
    }

    return (
        <div className="card w-auto bg-base-100 shadow-xl">
            <Typography fontWeight="bold" align="left">{username}</Typography>

            <figure><img src={imageData.url}  alt={imageData.id}/></figure>
            <Box sx={{paddingTop: 5, paddingLeft: 5, display: 'flex',}}>

                {imageData.likes.includes(loggedInUserId) ? <FavoriteIcon fontSize="large" style={{ color: 'rgb(255,0,0)' }}
                                                                          onClick={() =>handleLike(imageData.id,loggedInUserId)}/>
                    : <FavoriteBorderIcon fontSize="large" sx={{ "&:hover": { color: "gray"} }}
                                          onClick={() => handleLike(imageData.id,loggedInUserId)}/>}
            </Box>
            <Typography align="left" sx={{paddingTop: 1, paddingLeft: 6}}>{imageData.likes.length}
                {imageData.likes.length === 1 ? " like" : " likes"} </Typography>
            <div className="card-body">
                <p>{imageData.description}</p>

            </div>
        </div>
    );
}