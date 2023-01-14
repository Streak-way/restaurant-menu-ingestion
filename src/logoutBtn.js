import { Button } from "@mui/material";
import supabase from "./supabase";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginAtom } from "./recoil/loginAtom";

const LogoutBtn = () => {
  const isLogin = useRecoilValue(loginAtom);
  const [_, setLogin] = useRecoilState(loginAtom);
  const handleLogout = async () => {
    // supabase logout
    await supabase.auth.signOut();
    setLogin(false);
  };
  if (!isLogin) return null;
  return (
    <Button
      color="primary"
      onClick={handleLogout}
      variant="contained"
      style={{ position: "fixed", right: "7em", top: "2em" }}
    >
      Logout
    </Button>
  );
};
export default LogoutBtn;
