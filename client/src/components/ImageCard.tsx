import { ImageData } from "../types";
import Box from "@mui/material/Box";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


import {useState} from "react";
import Typography from "@mui/material/Typography";


export default function ImageCard({ imageData }: { imageData: ImageData }) {

    const [upvote, setUpvote] = useState(false)
    const [downvote, setDownvote] = useState(false)


    const handleUpvote = () => {
        if (upvote){
            setUpvote(false)
        } else {
            setUpvote(true)
        }

        console.log("upvoted")
    }

    const handleDownvote = () => {
        if (downvote){
            setDownvote(false)
        } else {
            setDownvote(true)
        }

        console.log("downvoted")
    }

    return (
        <div className="card w-auto bg-base-100 shadow-xl">
            <figure><img src={imageData.url}  alt={imageData.id}/></figure>
            <Box sx={{paddingTop: 5, paddingLeft: 5, display: 'flex',}}>
                <FavoriteBorderIcon/>
                {upvote ? <ThumbUpIcon onClick={handleUpvote}/> : <ThumbUpOffAltOutlinedIcon onClick={handleUpvote} />}
                {downvote ? <ThumbDownIcon onClick={handleDownvote}/> : <ThumbDownOffAltOutlinedIcon onClick={handleDownvote} />}
            </Box>
            <Typography align="left" sx={{paddingTop: 3, paddingLeft: 6}}>Likes {imageData.likes.length}</Typography>

            <div className="card-body">
                <p>{imageData.description}</p>
            </div>
        </div>
    );
}