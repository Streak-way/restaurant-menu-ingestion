import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import RestMenuItems from "./restMenuItems";
import EditIcon from "@mui/icons-material/Edit";
import RestaurantIntakeUpdate from "./RestaurantUpdate";
import { Delete } from "@mui/icons-material";
import { db } from "./db";
import { collection, deleteDoc, doc } from "firebase/firestore";

const MenuCard = ({ result }) => {
  console.log("result", result);
  const [open, setOpen] = useState(false);
  const [openRestDialog, setOpenRestDialog] = useState(false);
  const address = `${result.street} ${result.city} ${result.state} ${result.zipcode} ${result.country}`;
  const handleClick = () => {
    setOpenRestDialog(true);
  };
  const handleDeleteClick = async () => {
    // delete the restaurant from firestore
    const restRef = doc(db, "restaurants", result.id);
    await deleteDoc(restRef);
    // update restaurant in firestore
    toast.success("Restaurant Deleted successfully!");
  };
  return (
    <>
      <Card sx={{ maxWidth: "30em", width: "30em" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={result.image}
            alt="Hotel image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {result.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {address}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Menu items
          </Button>
          <IconButton aria-label="Edit" color="primary" onClick={handleClick}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            color="primary"
            onClick={handleDeleteClick}
          >
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth>
        <DialogTitle>{result.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <RestMenuItems restId={result.id} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openRestDialog}
        onClose={() => setOpenRestDialog(false)}
        maxWidth
      >
        <DialogTitle>{result.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <RestaurantIntakeUpdate
              restInfo={result}
              setOpen={setOpenRestDialog}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

const SearchRes = ({ results }) => {
  return results.map((result) => {
    return (
      <>
        <ToastContainer />
        <Box pt={2}></Box>
        <MenuCard result={result} />
        <Box pt={2}></Box>
      </>
    );
  });
};
export default SearchRes;
