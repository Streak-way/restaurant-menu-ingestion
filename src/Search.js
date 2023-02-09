import { Box, TextField, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import LogoutBtn from "./logoutBtn";
import OnBoardRest from "./onboardRest";
import { searchResAtom } from "./store/restaurantAtom";
import SearchRes from "./searchRes";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import firebase from "./firebase";

const RestSearch = () => {
  const [searchRes, setSearchRes] = useRecoilState(searchResAtom);
  const db = getFirestore(firebase);
  const restRef = collection(db, "restaurants");

  const handleOnChange = async (e) => {
    const restaurants = [];
    const searchTerm = e.target.value;
    // const restaurants = await query(
    //   restRef,
    //   where("name", "array-contains", searchTerm)
    // );
    // name contains searchTerm
    const q = await query(restRef, where("name", "==", searchTerm));
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot", querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      restaurants.push({ ...doc.data(), id: doc.id });
    });
    setSearchRes(restaurants);
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
