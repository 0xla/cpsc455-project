import {ImageData} from "../types";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from "@mui/material/Typography";
import axios from "axios";
import {setFeedImages, setImages} from "../slices/userSlice";
import {useDispatch,} from "react-redux";
import {decodeToken} from "react-jwt";
import {base_be_url} from "../util/constants";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import constants from "../statics/constants";
import ImageHeader from "./ImageHeader";


export default function ImageCard({imageData, isFeed}: { imageData: ImageData, isFeed: boolean }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let result: any;

    // @ts-ignore
    const loggedInUserId = decodeToken(localStorage.getItem("authToken")).id
    const handleLike = async (postId: string, loggedInUserId: string) => {
        if (imageData.likes.includes(loggedInUserId)) {
            try {
                const res = await axios.delete(
                    `${base_be_url}/api/posts/${postId}/likes/${loggedInUserId}`,
                );
                dispatch(setImages(res.data.data));
            } catch (err: any) {
                console.log("Error unliking post.")
            }
        } else {
            try {
                const res = await axios.put(
                    `${base_be_url}/api/posts/${postId}/likes/${loggedInUserId}`,
                );
                dispatch(setImages(res.data.data));
            } catch (err: any) {
                console.log("Error liking post.")
            }
        }

        if (isFeed) {
            try {
                result = await axios.get(
                    `${base_be_url}/api/images/following/${loggedInUserId}`
                )
            } catch (err) {
                console.log("Error getting following images.")
            }
            dispatch(setFeedImages(result.data.images));
        }
    }

    const navigateToUser = (username: string) => {
        navigate(`/${username}`)
    }

    const date = new Date(imageData.createdAt);
    const month = constants.MONTH_NAMES[date.getMonth()];
    const day = date.getDay();
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`

    return (
        <div className="card w-auto bg-base-100 shadow-xl">
            <ImageHeader username={imageData.username}></ImageHeader>
            <figure>
                <img
                    src={imageData.url}
                    alt={imageData.id}
                    className="object-cover object-top aspect-square"/>
            </figure>
            <Box sx={{paddingTop: 1, paddingLeft: 1, display: 'flex',}}>

                {imageData.likes.includes(loggedInUserId) ?
                    <FavoriteIcon fontSize="large" style={{color: 'rgb(255,0,0)'}}
                                  onClick={() => handleLike(imageData.id, loggedInUserId)}/>
                    : <FavoriteBorderIcon fontSize="large" sx={{"&:hover": {color: "gray"}}}
                                          onClick={() => handleLike(imageData.id, loggedInUserId)}/>}
            </Box>
            <Typography align="left" sx={{paddingTop: 1, paddingLeft: 3}}>{imageData.likes.length}
                {imageData.likes.length === 1 ? " like" : " likes"}
            </Typography>
            <div className="flex pl-6 pb-2 text-xs text-[#666666]">
                {formattedDate}
            </div>

        </div>
    );
}