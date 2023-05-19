import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Button,
  DialogContent,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteWidget } from "../store";
import CloseIcon from "@mui/icons-material/Close";

const RemoveDialog = ({ confirmDelete, setComfirmDelete, panelID }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setComfirmDelete(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = panelID;
    dispatch(deleteWidget({ id }));
    console.log(e);
  };
  return (
    <Dialog open={confirmDelete} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Remove panel{" "}
        <CloseIcon
          onClick={handleClose}
          sx={{ "&:hover": { cursor: "pointer" } }}
        />
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this panel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "white" }}
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#D73274",
              color: "white",
              "&:hover": { backgroundColor: "#ea77a3" },
            }}
            type="submit"
            variant="contained"
            onClick={handleClose}
          >
            Remove
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RemoveDialog;
