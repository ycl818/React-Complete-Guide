import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addVariable } from "../../store";

const Dialoag = ({ open, setOpen }) => {
  const [inputs, setInputs] = useState({
    variableName: "",
    defaultValue: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addVariable({ inputs }));
    setInputs({
      variableName: "",
      defaultValue: "",
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a Variable</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            You must enter a variable name. The default value does not
            necessarily need to be filled in.
          </DialogContentText>
          <TextField
            name="variableName"
            autoFocus
            margin="dense"
            id="name"
            label="Variable Name"
            type="text"
            fullWidth
            variant="standard"
            value={inputs.variableName}
            onChange={handleChange}
          />
          <TextField
            name="defaultValue"
            autoFocus
            margin="dense"
            id="name"
            label="Default Value"
            type="text"
            fullWidth
            variant="standard"
            value={inputs.defaultValue}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={() => {
              handleClose();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Dialoag;
