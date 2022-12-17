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
import supabase from "./supabase";

const theme = createTheme();

const handleSubmit = async (event) => {
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
  const userId = supabase.auth.user().id;
  const restObj = {
    name: data.get("restName"),
    street: data.get("streetAddress"),
    city: data.get("city"),
    zipcode: data.get("zipcode"),
    state: data.get("state"),
    country: data.get("country"),
    created_by: userId,
    last_modified_by: userId,
    lat: data.get("lat"),
    long: data.get("long"),
  };
  // make a post request to supabase
  try {
    toast("Saving your restaurant...");
    const { data, error } = await supabase
      .from("restaurants")
      .insert([restObj]);
    if (error) throw error;
    console.log(data);
    toast.success("Restaurant saved successfully!");
  } catch (error) {
    console.log(error);
  }
};
const RestaurantIntake = () => {
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
            {/* <HowToRegIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Recruiter Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
export default RestaurantIntake;
