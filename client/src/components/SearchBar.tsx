import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function FreeSolo() {

    const [userSuggestions, setUserSuggestions] = useState([]);
    const navigate = useNavigate();

    const getSuggestedUsers = async (user: string) => {
        try {
            const result = await axios.get(`https://web4-sm.herokuapp.com/api/users?exact=false&username=${user}`);
            return result.data.data;
        } catch (err) {
            console.error(err)
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

    return (
        <div>
            <Autocomplete
                freeSolo
                filterOptions={(x) => x}
                onChange={(e,value) => {
                    if (value) {
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
                            onKeyDown: (e) => {
                                // @ts-ignore
                                if (e.key === 'Enter' && userSuggestions[0].username === "No results found.") {
                                    e.stopPropagation();
                                }},
                            startAdornment: (
                                <>
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                    {params.InputProps.startAdornment}
                                </>
                            )
                        }
                        }
                    />
                )}
            />
        </div>
    )
}