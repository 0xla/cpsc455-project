import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {UserDetails} from "../types";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData, setAuthToken} from "../slices/userSlice";


export default function FreeSolo() {
    const [userSuggestions, setUserSuggestions] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getSuggestedUsers = async (user: string) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/users?exact=false&username=${user}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }});
            return result.data.data;
        } catch (err: any) {
            if(err.response.status === 401){
                window.localStorage.removeItem("authToken");
                dispatch(setAuthToken(""));
                navigate("/")
                console.error(err)
            }
        }
    }

    const handleInput = async (e: any) => {
        if (e.target.value) {
            let data: any = await getSuggestedUsers(e.target.value);
            if(data.length === 0){
                // @ts-ignore
                setUserSuggestions([{username: "No results found."}]);
            } else {
                setUserSuggestions(data);
            }
        }
    }

    const userData: UserDetails = useSelector(selectUserData);

    return (
        <div>
            <Autocomplete
                freeSolo
                filterOptions={(x) => x}
                onChange={(e,value) => {
                    if (value === userData.username){
                        navigate("/homepage")
                    }
                    else if(value) {
                        navigate(`/${value}`)
                    }
                }}
                options={
                    userSuggestions
                        ? userSuggestions.map((obj: { username: string }) => obj.username)
                        : []
                }
                getOptionDisabled={option => option === "No results found."}
                sx={{width: 300}}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search"
                        onChange={(e) => handleInput(e)}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <>
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                    {params.InputProps.startAdornment}
                                </>
                            )
                        }}

                    />
                )}
            />
        </div>

  )
}
