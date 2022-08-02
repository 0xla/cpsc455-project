import { ImageData } from "../types";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from "@mui/material/Typography";
import axios from "axios";
import {setFeedImages, setImages} from "../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {decodeToken} from "react-jwt";
import Button from "@mui/material/Button";
import React from "react";
import {useNavigate} from "react-router-dom";


// @ts-ignore
export default function FeedCard({ imageData, username, }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // @ts-ignore
    const loggedInUserId = decodeToken(localStorage.getItem("authToken")).id

    const handleLike = async (postId: string, loggedInUserId: string) => {
        if (imageData.likes.includes(loggedInUserId)) {
            try {
                const res = await axios.delete(
                    `http://localhost:5000/api/posts/${postId}/likes/${loggedInUserId}`,
                );
                console.log(res.data.data)
                const result = await axios.get(
                    `http://localhost:5000/api/images/${loggedInUserId}`
                )
                dispatch(setFeedImages(result.data.data));
            } catch (err: any) {
                console.log("Error unliking post.")
            }
        } else {
            try {
                const res = await axios.put(
                    `http://localhost:5000/api/posts/${postId}/likes/${loggedInUserId}`,
                );
                console.log(res.data.data)
                const result = await axios.get(
                    `http://localhost:5000/api/images/${loggedInUserId}`
                )
                dispatch(setFeedImages(result.data.data));

            } catch (err: any) {
                console.log("Error liking post.")
            }
        }
    }

    const findUser = (username: string) => {
        navigate(`/${username}`)
    }

    return (
        <div className="card w-auto bg-base-100 shadow-xl">
            <Button  onClick={()=>findUser(username)} style={{textTransform: 'none', fontSize: "20px"}}>{username}</Button>

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