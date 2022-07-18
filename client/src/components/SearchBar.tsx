import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {UserDetails} from "../types";
import {useSelector} from "react-redux";
import {selectUserData} from "../slices/userSlice";

export default function FreeSolo() {
    const [userSuggestions, setUserSuggestions] = useState([]);
    const navigate = useNavigate();

    const getSuggestedUsers = async (user: string) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/users?exact=false&username=${user}`);
            return result.data.data;
        } catch (err) {
            console.error(err)
        }
    }

    const handleInput = async (e: any) => {
        if (e.target.value) {
            let data: any = await getSuggestedUsers(e.target.value);
            setUserSuggestions(data);
        }
    }

    const userData: UserDetails = useSelector(selectUserData);

    return (
        <div>
            <Autocomplete
                freeSolo
                filterOptions={(x) => x}
                onChange={(e,value) => {
                    //TODO some logic for when user clicks on a name
                    if(value) {
                        navigate(`/${value}`)
                    }
                    console.log(value)
                }}
                options={
                    userSuggestions
                        ? userSuggestions.map((obj: { username: string }) => obj.username)
                        : []
                }
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
