import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function HelpTextarea() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Text us for Help!
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Do you need a hand?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To improve your experience of this website, please enter your concern or questions here. We
            are happy to help you .
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Leave your comments here"
            type="string"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
