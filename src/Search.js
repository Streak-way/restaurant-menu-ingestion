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
  orderBy,
  getDocs,
  startAt,
} from "firebase/firestore";
import firebase from "./firebase";

const RestSearch = () => {
  console.log("rest search rendering");
  const [searchRes, setSearchRes] = useRecoilState(searchResAtom);
  const db = getFirestore(firebase);
  const restRef = collection(db, "restaurants");

  const handleOnChange = async (e) => {
    const restaurants = [];
    const searchTerm = e.target.value;
    if (searchTerm.length === 0) {
      setSearchRes([]);
      return;
    }

    console.log("searchTerm", searchTerm);
    // firebase db query name contains searchTerm
    const q = await query(
      restRef,
      where("name", ">=", searchTerm),
      where("name", "<=", searchTerm + "\uf8ff"),
      orderBy("name", "asc")
    );
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot", querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      restaurants.push({ ...doc.data(), id: doc.id });
    });
    console.log("restaurants", restaurants);
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
