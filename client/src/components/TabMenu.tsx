import { Paper, Tab, Tabs } from "@mui/material";
import "../App/App.css"
import {useSelector} from "react-redux";
import {selectAuthToken} from "../slices/userSlice";
import {decodeToken} from "react-jwt";

export default function TabMenu({ option, optionChange, username }: { option: number, optionChange: any, username: any }) {
    let authToken = useSelector(selectAuthToken);
    // @ts-ignore
    const loggedInUsername = decodeToken(localStorage.getItem("authToken")).username;

    return (
        <Paper square className="Tabs__main">
            <Tabs value={option} onChange={optionChange} centered>
                <Tab label="Photos" />
                <Tab label="Analysis" />
                {loggedInUsername === username &&<Tab label="Feed"/>}
            </Tabs>
        </Paper>

    );

}