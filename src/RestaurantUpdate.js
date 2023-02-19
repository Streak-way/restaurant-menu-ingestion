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
import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import firebase from "./firebase";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const theme = createTheme();

// react functional component with two props

const RestaurantIntakeUpdate = ({ setOpen, restInfo }) => {
  console.log("restInfo", restInfo);
  const db = getFirestore(firebase);
  const auth = getAuth(firebase);
  const storage = getStorage(firebase);

  // states for restaurant info
  const [restName, setRestName] = useState(restInfo.name);
  const [streetAddress, setStreetAddress] = useState(restInfo.street);
  const [city, setCity] = useState(restInfo.city);
  const [zipcode, setZipcode] = useState(restInfo.zipcode);
  const [state, setState] = useState(restInfo.state);
  const [country, setCountry] = useState(restInfo.country);
  const [latitude, setLatitude] = useState(restInfo.lat);
  const [longitude, setLongitude] = useState(restInfo.long);
  const [image, setImage] = useState(restInfo.image);

  const handleSubmit = async (event) => {
    // get current user location
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // get current user
    const user = auth.currentUser;
    const userId = user.uid;
    const restObj = {
      name: restName,
      street: streetAddress,
      city: city,
      zipcode: zipcode,
      state: state,
      country: country,
      lat: latitude,
      long: longitude,
      userId: userId,
      image: image,
    };
    const file = data.get("image");
    try {
      // // save image to firebase storage
      // const storageRef = ref(storage, `images/${file.name}`);
      // const res = await uploadBytes(storageRef, file);
      // const url = await getDownloadURL(res.ref);
      // restObj.image = url;
      // save restaurant to firestore
      const restRef = doc(db, "restaurants", restInfo.id);
      await updateDoc(restRef, restObj);
      // update restaurant in firestore
      toast.success("Restaurant updated successfully!");
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
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Restaurant Info
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
                  value={restName}
                  onChange={(e) => setRestName(e.target.value)}
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
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
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
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                {/* file upload button */}
                <input type="file" name="image" />
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
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
export default RestaurantIntakeUpdate;
