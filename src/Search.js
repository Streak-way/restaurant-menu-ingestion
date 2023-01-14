import { Box, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import OnBoardRest from "./onboardRest";
import { searchResAtom } from "./recoil/restaurantAtom";
import SearchRes from "./searchRes";
import supabase from "./supabase";

const RestSearch = () => {
  const navigate = useNavigate();

  const [setSearchRes] = useRecoilState(searchResAtom);
  const searchResults = useRecoilValue(searchResAtom);
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
          <img
            src="streak-way-logo.png"
            className="App-logo"
            alt="logo"
            onClick={() => navigate("/")}
          />
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
      </div>

      <Box pt={2} marginTop={10}>
        {searchResults && searchResults.length > 0 && (
          <SearchRes results={searchResults} />
        )}
      </Box>
    </>
  );
};
export default RestSearch;
