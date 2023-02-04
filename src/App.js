import "./App.css";
// react dom router
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import RestaurantIntake from "./RestaurantIntake";
import PrivateRoute from "./privateRoute";
import RestSearch from "./Search";

function App() {
  console.log("app");
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
    </div>
  );
}
export default App;
