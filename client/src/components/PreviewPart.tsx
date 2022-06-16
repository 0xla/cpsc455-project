import { Box, Typography } from "@mui/material";
import React from "react";
import { PreviewPartProps } from "./types";

const PreviewPart = ({ previewImageList }: PreviewPartProps) => {
    return (
      <Box padding={2}>
        <Typography variant={"h6"}>{"Preview Files"}</Typography>
        {previewImageList.map((file,i) => (
          <Box key={i}>
            <img width={200} height={"auto"} alt={file.name} src={file.src} />
            <Typography>{file.name}</Typography>
            </Box>

        ))}
      </Box>
      
    );
  };

  export default PreviewPart;