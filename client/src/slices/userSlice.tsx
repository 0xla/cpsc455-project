import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { UserDetails, ImageData } from "../types";
// import { images, profileImageUrl, userBio } from "../dummydata/imagesPlaceholder";
import axios from "axios";
import { SliceState } from "../types";



export const getUser: any = createAsyncThunk(
    'users/fetchById',
    async (params: any, thunkAPI: any) =>{
        console.log("reaching async thunk ");
        console.log("params ", params);
        const url = `http://localhost:5000/api/users/${params.id}`;
        console.log("url ", url);
        try{
            const response = await axios.get(url);
            console.log("response", response.data);
            return response.data;
        }
        catch(err : any){
            console.log(err);
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        // isUserDataRetrieved: false,
        error: false,
        userData: {
            username: '',
            email: "",
            followers: [],
            followings: [],
            profilePicture: "",
            bio: "",
            images: [],
        }
    } as SliceState,
    reducers: {
        // addImage(state, action) {
        //     state.userData.images = [state.userData.images, action.payload]
        // },

        // removeImage(state, action) {
        //     state.userData.images.filter((image: ImageData) => image.id !== action.payload);
        // },

        updateUserBio(state, action) {
            state.userData.bio = action.payload;
        }
    },
    extraReducers: {
        /* TODO: state changes related to async thunk calls */
        [getUser.pending]: (state) => {
            state.loading = true
          },
          [getUser.fulfilled]: (state, action) => {
            state.loading = false
            state.userData = action.payload
          },
          [getUser.rejected]: (state) => {
            state.loading = false
            state.error = true
          },
    }

});

export const { updateUserBio } = userSlice.actions;
// export const selectUserData = (state: any) => state.user.userData
// export const selectIsLoadingUserData = (state: any) => state.user.loading;
// export const selectIsUserDataRetrieved = (state: any) => state.user.isUserDataRetrieved;
export default userSlice.reducer;

