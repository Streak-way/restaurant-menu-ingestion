import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginAtom } from "./store/loginAtom";

const PrivateRoute = ({ children }) => {
  const isLogin = useRecoilValue(loginAtom);
  console.log("isLogin in pr", isLogin);
  if (isLogin === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
