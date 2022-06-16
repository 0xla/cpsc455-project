import { Box, Button, makeStyles, Paper} from "@mui/material";
import { memo } from "react";
import DragDropFileBox from "./DragDropFileBox";
import { UploadFormProps } from "./types";
import UploadLableWrapper from "./UploadLableWrapper";


const useStyles = makeStyles((theme)=> ({
  root: {},
  uploadInput: {
    display:"none",
    hight:1
  },
  confirmButtonPart: {
    padding: theme.spacing(1),
    testAlign:"center"
  }
}));


const UploadForm = (props: UploadFormProps) => {
  const {isUploadAvailble = true, children, onSubmit, onChangeFiles} =props;
  const classes = useStyles();

  return(
    <Box>
      <form>
        <Paper style={{padding:8}}>
          <UploadLableWrapper>
            <input type="file" multiple name="files" onChange={onChangeFiles} />
          </UploadLableWrapper>
          <DragDropFileBox {...props} />
          <hr/>
          {children}
        </Paper>
        <Box className= {classes.confirmButtonPart}>
          <Button
          disabled={!isUploadAvailble}
          color={"primary"}
          variant={"contained"}
          onClick={onSubmit}
          >
            Upload
          </Button>
        </Box>
      </form>
    </Box>
  )
    
   
  };
  
  export default memo(UploadForm);
