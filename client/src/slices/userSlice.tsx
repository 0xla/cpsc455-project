import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDetails, ImageData } from "../types";
import { images, profileImageUrl, userBio } from "../dummydata/imagesPlaceholder";


type SliceState = {
    loading: boolean;
    isUserDataRetrieved: boolean;
    error: string | undefined;
    userData: UserDetails;
    authToken: string | undefined;
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isUserDataRetrieved: false,
        error: undefined,
        userData: {
            username: '',
            userId: '',
            userBio: userBio,
            profileImageUrl: profileImageUrl,
            images: images,
            followers: [],
            followings: []
        },
        authToken: undefined,
    } as SliceState,
    reducers: {
        addImage(state, action) {
            state.userData.images.push(action.payload)
        },
        setImages(state, action) {
            state.userData.images = action.payload;
        },
        removeImage(state, action) {
            state.userData.images.filter((image: ImageData) => image.id !== action.payload);
        },
        setUsername(state, action) {
            state.userData.username = action.payload;
        },
        setUserId(state, action) {
            state.userData.userId = action.payload;
        },

        setUserBio(state, action) {
            state.userData.userBio = action.payload;
        },
        setAuthToken(state, action) {
            state.authToken = action.payload;
        },
        setFollowers(state, action) {
            state.userData.followers = action.payload;
        },
        setFollowings(state, action) {
            state.userData.followings = action.payload;
        },
        setProfileImageUrl(state, action) {
            state.userData.profileImageUrl = action.payload;
        }
    },

    extraReducers(builder) {
        /* TODO: state changes related to async thunk calls */
    }

});


export const { addImage, removeImage, setUserBio, setUsername,
    setImages, setAuthToken, setFollowers, setFollowings, setProfileImageUrl,setUserId } = userSlice.actions;

export const selectUserData = (state: any) => state.user.userData;
export const selectAuthToken = (state: any) => state.user.authToken;
export const selectIsLoadingUserData = (state: any) => state.user.loading;
export const selectIsUserDataRetrieved = (state: any) => state.user.isUserDataRetrieved;
export default userSlice.reducer;