import { Copyright } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container } from "@mui/system";
import { toast } from "react-toastify";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useEffect, useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import firebase from "./firebase";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const theme = createTheme();

const RestaurantIntake = ({ setOpen }) => {
  const db = getFirestore(firebase);
  const auth = getAuth(firebase);
  const storage = getStorage(firebase);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    const getLocation = async () => {
      const { coords } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return coords;
    };
    getLocation().then((coords) => {
      console.log("coords in useffect", coords);
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    });
  });

  const handleSubmit = async (event) => {
    // get current user location
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      restName: data.get("restName"),
      streetAddress: data.get("streetAddress"),
      city: data.get("city"),
      zipcode: data.get("zipcode"),
      state: data.get("state"),
      country: data.get("country"),
    });
    // get current user
    console.log("firebase", firebase);
    const user = auth.currentUser;
    const userId = user.uid;
    const restObj = {
      name: data.get("restName"),
      street: data.get("streetAddress"),
      city: data.get("city"),
      zipcode: data.get("zipcode"),
      state: data.get("state"),
      country: data.get("country"),
      created_by: userId,
      last_modified_by: userId,
      lat: latitude,
      long: longitude,
    };
    const file = data.get("image");
    // make a post request to supabase
    try {
      // save image to firebase storage
      const storageRef = ref(storage, `images/${file.name}`);
      const res = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(res.ref);
      restObj.image = url;
      // save restaurant to firestore
      const docRef = await addDoc(collection(db, "restaurants"), restObj);

      toast.success("Restaurant saved successfully!");
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <RestaurantMenuIcon />
            {/* <HowToRegIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Restaurant on Boarding
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="rest-name"
                  name="restName"
                  required
                  fullWidth
                  id="restName"
                  label="Restaurant Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="streetAddress"
                  label="street address"
                  name="streetAddress"
                  autoComplete="streetAddress"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="City"
                  label="City"
                  name="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="zipcode"
                  label="zipcode"
                  name="zipcode"
                  autoComplete="zipcode"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="state"
                  name="state"
                  autoComplete="state"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="country"
                  name="country"
                  autoComplete="country"
                />
              </Grid>
              <Grid item xs={12}>
                {/* file upload button */}
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    // get upload file
                    const file = e.target.files[0];
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
          {/* TODO google map integration */}
          {/* <div style={{ height: "100vh", width: "100%" }}> */}
          {/* <GoogleMapReact
            // center={{ lat: 59, lng: 10 }}
            // zoom={zoom}
            ></GoogleMapReact> */}
          {/* </div> */}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
export default RestaurantIntake;
