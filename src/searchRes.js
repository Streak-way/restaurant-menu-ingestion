import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchRes = ({ results }) => {
  console.log("results", results);
  const [open, setOpen] = useState(false);
  return results.map((result) => {
    const address = `${result.street} ${result.city} ${result.state} ${result.zipcode} ${result.country}`;
    return (
      <>
        <ToastContainer />
        <Box pt={2}></Box>
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
          </CardActions>
        </Card>
        <Box pt={2}></Box>
      </>
    );
  });
};
export default SearchRes;
