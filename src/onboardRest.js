import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRecoilState } from "recoil";
import RestaurantIntake from "./RestaurantIntake";
import { restOnboardDialog } from "./store/restOnboard";
const OnBoardRest = () => {
  // dialog open
  // recoil state for dialog open
  console.log("on board page");
  const [open, setOpen] = useRecoilState(restOnboardDialog);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log("on board page");
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
          {open && <RestaurantIntake setOpen={setOpen} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnBoardRest;
