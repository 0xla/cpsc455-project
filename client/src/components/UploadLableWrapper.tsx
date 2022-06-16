import { CloudUploadOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import makeStyles from "@mui/material/styles/makeStyles";
import React, { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        display:"inline-block",
        transition: "0.2s",
        cursor: "pointer",
        "&:hover": {
            transition: "0.2s",
            backgroundColor:"#ddd"
        },
        backgroundColor:"#eee",
        padding: theme.spacing(0.5),
        borderRadius: theme.spacing(0.5)

    }
}));

const UploadLableWrapper = ({children}:{children: ReactNode}) => {
    const classes = useStyles();

    return(
        <label>
            <Box className ={classes.root}>
                <Box display= {"flex"} alignItems={"center"}>
                    <CloudUploadOutlined fontSize={"large"} color={"primary"}/>
                    <Typography>Click to upload</Typography>
                    
                </Box>
                <Box style={{display: "none"}}>{children}</Box>
            </Box>
        </label>
    )
}

export default UploadLableWrapper;
