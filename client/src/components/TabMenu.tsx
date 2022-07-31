import { Paper, Tab, Tabs } from "@mui/material";
import "../App/App.css"

export default function TabMenu({ option, optionChange }: { option: number, optionChange: any }) {
    return (
        <Paper square className="Tabs__main">
            <Tabs value={option} onChange={optionChange} centered>
                <Tab label="Photos" />
                <Tab label="Analysis" />
                <Tab label="Feed"/>
            </Tabs>
        </Paper>

    );

}