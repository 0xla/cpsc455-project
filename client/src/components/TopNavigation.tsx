import axios from "axios";
import {useState} from "react";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";


const getNameTwo = async (name: string) => {
    try {
        let url = "http://localhost:5000/api/autocomplete?username=" + name;

        let {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error(error);
    }
};


const TopNavigation = () => {
    const [optionsTwo, setOptionsTwo] = useState([]);
    const [value, setValue] = useState("");

    const onChangeOne = async (e: any) => {
        if (e.target.value) {
            let data = await getNameTwo(e.target.value);
            setOptionsTwo(data);
        }
    };


    return (
        <div className="navbar w-full bg-base-100 z-50 border-b-[1px] border-[#dbdbdb]">
            <div className="w-full mx-[10vw] flex justify-between">
                <div className="flex">
                    <a className="btn btn-ghost normal-case text-xl" href="localhost:3000/homepage">Anagram</a>
                </div>
                <div className="flex-none gap-2">
                    <Autocomplete
                        freeSolo
                        filterOptions={(x) => x}
                        onChange={(e: any) => {
                            setValue(e.target.innerText);
                        }}
                        options={
                            optionsTwo
                                ? optionsTwo.map((obj: { username: string }) => obj.username)
                                : []
                        }

                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search One"
                                onChange={(e) => onChangeOne(e)}
                            />
                        )}/>
                    {/*<div className="form-control">*/}
                    {/*    <input type="text" placeholder="Search" list="usernames" onChange={onChangeOne} className="input input-bordered"/>*/}
                    {/*    <datalist id="usernames">*/}
                    {/*        {optionsTwo}*/}
                    {/*    </datalist>*/}
                    {/*</div>*/}
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="profile-pic" src="https://api.lorem.space/image/face?hash=33791"/>
                        </div>
                    </label>
                    <ul tabIndex={0}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a href="localhost:3000/Profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a href="localhost:3000/settings">Settings</a></li>
                        <li><a href="localhost:3000/logout">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TopNavigation;

