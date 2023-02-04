import { Button } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginAtom } from "./store/loginAtom";
import firebase from "./firebase";
import { getAuth } from "firebase/auth";

const LogoutBtn = () => {
  const isLogin = useRecoilValue(loginAtom);
  const [_, setLogin] = useRecoilState(loginAtom);
  const handleLogout = async () => {
    if (!isLogin) return;
    // logout from firebase
    await getAuth(firebase).signOut();
    setLogin(false);
  };
  if (!isLogin) return null;
  return (
    <Button color="primary" onClick={handleLogout} variant="contained">
      Logout
    </Button>
  );
};
export default LogoutBtn;
