import "./App.css";
// react dom router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from "./login";
import Sucess from "./Success";
import RestaurantIntake from "./RestaurantIntake";
import { loginAtom } from "./recoil/loginAtom";
import PrivateRoute from "./privateRoute";
import { Fragment } from "react";
import { Button } from "@mui/material";
import supabase from "./supabase";
import { useRecoilState, useRecoilValue } from "recoil";

function App() {
  const isLogin = useRecoilValue(loginAtom);
  const [_, setLogin] = useRecoilState(loginAtom);
  const handleLogout = async () => {
    // supabase logout
    await supabase.auth.signOut();
    setLogin(false);
  };
  // https://supabase.com/docs/guides/auth/auth-google
  return (
    <div className="App">
      <header className="App-header">
        <Button color="primary" onClick={handleLogout}>
          Logout
        </Button>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            {/* create protected routes */}
            <Fragment></Fragment>
            <Route path="/success" element={<Sucess />} />
            <Route
              path="/intake"
              element={
                <PrivateRoute>
                  <RestaurantIntake />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </header>
    </div>
  );
}
export default App;
