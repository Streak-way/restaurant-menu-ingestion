import "./App.css";
// react dom router
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import RestaurantIntake from "./RestaurantIntake";
import PrivateRoute from "./privateRoute";
import LogoutBtn from "./logoutBtn";
import RestSearch from "./Search";

function App() {
  // https://supabase.com/docs/guides/auth/auth-google
  return (
    <div className="App">
      {/* logo */}
      {/* navigate home on click */}

      <header className="App-header">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {/* create protected routes */}
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <RestSearch />
              </PrivateRoute>
            }
          />
          <Route
            path="/intake"
            element={
              <PrivateRoute>
                <RestaurantIntake />
              </PrivateRoute>
            }
          />
        </Routes>
      </header>
      {LogoutBtn()}
    </div>
  );
}
export default App;
