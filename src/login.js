// react function component
import { GoogleLoginButton } from "react-social-login-buttons";
import { loginWithProvider } from "./auth";
import supabase from "./supabase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import { loginAtom } from "./recoil/loginAtom";

const Login = () => {
  const [_, setLogin] = useRecoilState(loginAtom);
  const navigate = useNavigate();
  // supabase on auth state change
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("event", event, "session", session);
    //   get user data
    if (event === "SIGNED_IN") {
      // get user data
      const userMetadata = session.user.user_metadata;
      const { avatar_url, email, full_name } = userMetadata;
      navigate("/search");
      toast("Login Successful!");
      setLogin(true);
      console.log("signed in");
    } else {
      console.log("not signed in");
    }
  });
  return (
    <div>
      <GoogleLoginButton onClick={() => loginWithProvider("google")} />
      <ToastContainer />
    </div>
  );
};
export default Login;
