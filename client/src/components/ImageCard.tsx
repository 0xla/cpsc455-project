import { ImageData } from "../types";

import Box from "@mui/material/Box";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {selectUserData, setImages} from "../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";

export default function ImageCard({ imageData }: { imageData: ImageData }) {
    const [isLiked, setIsLiked] = useState(false)
    const dispatch = useDispatch();
    const {userId} = useSelector(selectUserData);


    const likePost = async (postId: number, userId: string) => {

        try {
            const res = await axios.put(
                `http://localhost:5000/api/posts/${postId}/likes/${userId}`,
            );
            dispatch(setImages(res.data.data));
            setIsLiked(true)
            console.log(res.data.data)
        } catch (err: any) {

        }
    }

    const unlikePost = async (postId: number, userId: string) => {

        try {
            const res = await axios.delete(
                `http://localhost:5000/api/posts/${postId}/likes/${userId}`,
            );
            dispatch(setImages(res.data.data));
            setIsLiked(false)
            console.log(res)
        } catch (err: any) {

        }
    }

    const handleLike = async (postId: string, userId: string) => {
        console.log(imageData)
        console.log("postid " + postId)
        if (imageData.likes.includes(userId)) {
            try {
                const res = await axios.delete(
                    `http://localhost:5000/api/posts/${postId}/likes/${userId}`,
                );
                dispatch(setImages(res.data.data));
            } catch (err: any) {

            }
        } else {
            try {
                const res = await axios.put(
                    `http://localhost:5000/api/posts/${postId}/likes/${userId}`,
                );
                console.log(res.data.data)
                dispatch(setImages(res.data.data));

            } catch (err: any) {
                console.log("error liking")

            }
        }
    }




    return (
        <div className="card w-auto bg-base-100 shadow-xl">
            <figure><img src={imageData.url}  alt={imageData.id}/></figure>
            <Box sx={{paddingTop: 5, paddingLeft: 5, display: 'flex',}}>

                {/*<FavoriteBorderIcon style={{ color: 'rgb(255,0,0)' }} onClick={() => likePost(1,2)}/>*/}

                {imageData.likes.includes(userId) ? <FavoriteIcon style={{ color: 'rgb(255,0,0)' }} onClick={() =>handleLike(imageData.id,userId)}/> : <FavoriteBorderIcon onClick={() => handleLike(imageData.id,userId)}/>}


                {/*<ThumbUpIcon onClick={() => likePost(1,"62a54042cf860174904de5de")}/>*/}
                {/*<ThumbDownIcon onClick={() => unlikePost(1,"62a54042cf860174904de5de")}/>*/}
                {/*{upvote ? <ThumbUpIcon onClick={likePost(1,2)}/> : <ThumbUpOffAltOutlinedIcon onClick={handleUpvote} />}*/}
                {/*{downvote ? <ThumbDownIcon onClick={handleDownvote}/> : <ThumbDownOffAltOutlinedIcon onClick={handleDownvote} />}*/}
            </Box>
            <Typography align="left" sx={{paddingTop: 1, paddingLeft: 6}}>{imageData.likes.length} {imageData.likes.length === 1 ? "like" : "likes"} </Typography>
            <div className="card-body">
                <p>{imageData.description}</p>
            </div>
        </div>
    );
}