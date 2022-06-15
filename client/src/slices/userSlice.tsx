import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../types";
import { images } from "../dummydata/imagesPlaceholder";


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
            userBio: '',
            profileImageUrl: '',
            images: images,
        }
    } as SliceState,
    reducers: {
        addImage(state, action) {
            state.userData.images = [state.userData.images, action.payload]
        }
    },
    extraReducers(builder) {
        /* TODO: state changes related to async thunk calls */
    }

});

export const { addImage } = userSlice.actions;
export const selectUserData = (state: any) => state.user.userData
export const selectIsLoadingUserData = (state: any) => state.user.loading;
export const selectIsUserDataRetrieved = (state: any) => state.user.isUserDataRetrieved;
export default userSlice.reducer;

