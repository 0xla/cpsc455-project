//import { Theme, ThemeContext } from "@emotion/react";
import { FileCopy } from "@mui/icons-material";
//import { Box, makeStyles, Typography } from "@mui/material";
import React,{ RefObject } from "react";
import { Box, makeStyles as createTheme, RootRef, Theme, Typography } from "@mui/material";

export interface DragDropFileBoxProps {
  isDragging: boolean;
  boxRef: RefObject<HTMLElement>;
    
  }

  const useStyles= createTheme<Theme, DragDropFileBoxProps>((theme) => ({
    root: {
      position: "relative",
      padding: theme.spacing(3),
      borderRedius:theme.spacing(1),
      border: "2px solid #eee",
      borderStyle: "dashed",
      borderColor: theme.palette.primary.dark,
      backgroundColor: (props: { isDragging: any; }) => (props.isDragging? "#bbb": "#fff"),
      opacity:0.75
    }
  }));


  const DragDropFileBox = (props: DragDropFileBoxProps) => {
    const {boxRef} = props;
    const classes =useStyles(props);

    return (
      <RootRef rootRef={boxRef}>
        <Box 
          className= {classes.root}
          display= {"flex"}
          justifyContent= {"center"}
          alignItem= {"center"}
        >
          <FileCopy fontSize={"large"}/>
          <Typography>Drag file here</Typography>
        </Box>
      </RootRef>
    );
   
  };
  
  export default DragDropFileBox;