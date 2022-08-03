import { Paper, Tab, Tabs } from "@mui/material";
import "../App/App.css"
import {decodeToken} from "react-jwt";

export default function TabMenu({ option, optionChange, username}: { option: number, optionChange: any, username: any  }) {
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