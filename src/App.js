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
import { useRecoilValue } from "recoil";
import { loginAtom } from "./recoil/loginAtom";
import PrivateRoute from "./privateRoute";
import { Fragment } from "react";

function App() {
  // https://supabase.com/docs/guides/auth/auth-google
  return (
    <div className="App">
      <header className="App-header">
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
