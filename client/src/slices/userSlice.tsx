import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDetails, ImageData } from "../types";
import { images, profileImageUrl, userBio } from "../dummydata/imagesPlaceholder";


type SliceState = {
    loading: boolean;
    isUserDataRetrieved: boolean;
    error: string | undefined;
    userData: UserDetails;
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isUserDataRetrieved: false,
        error: undefined,
        userData: {
            username: '',
            userBio: userBio,
            profileImageUrl: profileImageUrl,
            images: images,
        }
    } as SliceState,
    reducers: {
        addImage(state, action) {
            state.userData.images.push(action.payload)        },
        setImages(state, action) {
            state.userData.images = action.payload;
        },
        removeImage(state, action) {
            state.userData.images.filter((image: ImageData) => image.id !== action.payload);
        },
        setUsername(state, action) {
            state.userData.username = action.payload;
        },

        updateUserBio(state, action) {
            state.userData.userBio = action.payload;
        }
    },
    extraReducers(builder) {
        /* TODO: state changes related to async thunk calls */
    }

});

export const { addImage, removeImage, updateUserBio, setUsername, setImages } = userSlice.actions;
export const selectUserData = (state: any) => state.user.userData
export const selectIsLoadingUserData = (state: any) => state.user.loading;
export const selectIsUserDataRetrieved = (state: any) => state.user.isUserDataRetrieved;
export default userSlice.reducer;

