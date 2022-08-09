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
import constants from "../statics/constants";
import ImageHeader from "./ImageHeader";


export default function ImageCard({imageData, isFeed}: { imageData: ImageData, isFeed: boolean }) {
    const dispatch = useDispatch();
    let result: any;

    // @ts-ignore
    const loggedInUserId = decodeToken(localStorage.getItem("authToken")).id
    const handleLike = async (postId: string, loggedInUserId: string) => {
        let res;
        try {
            if (imageData.likes.includes(loggedInUserId)) {
                res = await axios.delete(
                    `${base_be_url}/api/posts/${postId}/likes/${loggedInUserId}`,);
            } else {
                res = await axios.put(
                    `${base_be_url}/api/posts/${postId}/likes/${loggedInUserId}`,
                );
            }
            if (!isFeed) {
                dispatch(setImages(res.data.data));
            }
            if (isFeed) {
                res = await axios.get(
                    `${base_be_url}/api/images/following/${loggedInUserId}`
                )
                dispatch(setFeedImages(res.data.images));
            }
        } catch (err) {
            console.log(err);
        }
    }

    const date = new Date(imageData.createdAt);
    const month = constants.MONTH_NAMES[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`

    return (
        <div className="card w-auto bg-base-100 shadow-xl">
            <ImageHeader username={imageData.username} profilePicture={imageData.profilePicture}></ImageHeader>
            <figure>
                <img
                    src={imageData.url}
                    alt={imageData.id}
                    className="object-cover object-top aspect-square"/>
            </figure>
            <Box sx={{paddingTop: 1, paddingLeft: 1, display: 'flex',}}>

                {imageData.likes.includes(loggedInUserId) ?
                    <FavoriteIcon fontSize="large" style={{color: 'rgb(255,0,0)', cursor: 'pointer'}}
                                  onClick={() => handleLike(imageData.id, loggedInUserId)}/>
                    : <FavoriteBorderIcon fontSize="large" sx={{"&:hover": {color: "gray"}, cursor: 'pointer'}}
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