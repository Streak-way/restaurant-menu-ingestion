import { Box, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import LogoutBtn from "./logoutBtn";
import OnBoardRest from "./onboardRest";
import { searchResAtom } from "./store/restaurantAtom";
import SearchRes from "./searchRes";
import supabase from "./supabase";

const RestSearch = () => {
  const navigate = useNavigate();

  const [searchRes, setSearchRes] = useRecoilState(searchResAtom);
  const handleOnChange = async (e) => {
    const searchTerm = e.target.value;
    // call supabase to search for restaurants
    const res = await supabase
      .from("restaurants")
      .select("*")
      .like("name", `%${searchTerm}%`);
    setSearchRes(res.data);
  };
  return (
    <>
      <div style={{ width: "70em", marginTop: "1em" }}>
        <div style={{ display: "inline" }}>
          {/* put streak way logo */}
          <Typography
            variant="h4"
            component="div"
            style={{ fontFamily: "cursive", display: "inline", padding: "1em" }}
          >
            Streak Way
          </Typography>
          {/* <img
            src="streak-way-logo.png"
            className="App-logo"
            alt="logo"
            onClick={() => navigate("/")}
          /> */}
        </div>
        <div style={{ display: "inline" }}>
          <TextField
            id="rest-name"
            label="Search Restaurants by name..."
            variant="outlined"
            style={{ width: "30em" }}
            onChange={handleOnChange}
            size="large"
          />
        </div>
        <div
          style={{
            display: "inline",
            paddingLeft: "1em",
            verticalAlign: "top",
          }}
        >
          <OnBoardRest />
        </div>
        <div
          style={{
            display: "inline",
            paddingLeft: "1em",
            verticalAlign: "top",
          }}
        >
          <LogoutBtn />
        </div>
      </div>

      <Box pt={2} marginTop={10}>
        {searchRes && searchRes.length > 0 && <SearchRes results={searchRes} />}
      </Box>
    </>
  );
};
export default RestSearch;
