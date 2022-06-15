import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../types";


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
            imageUrls: [],
        }
    } as SliceState,
    reducers: {
        addImage(state, action) {
            state.userData.imageUrls = [state.userData.imageUrls, action.payload]
        }
    },
    extraReducers(builder) {
        /* TODO: state changes related to async thunk calls */
    }

});

export const { addImage } = userSlice.actions;
export const selectUserData = (state: any) => state.userData
export const selectIsLoadingUserData = (state: any) => state.loading;
export const selectIsUserDataRetrieved = (state: any) => state.isUserDataRetrieved;
export default userSlice.reducer;

