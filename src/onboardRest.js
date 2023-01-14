import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import RestaurantIntake from "./RestaurantIntake";
const OnBoardRest = () => {
  // dialog open
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpen}
        variant="contained"
      >
        On Board Restaurant
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>On Board Restaurant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the restaurant information
          </DialogContentText>
          <RestaurantIntake />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnBoardRest;
