// react function component
import { GoogleLoginButton } from "react-social-login-buttons";
import { loginWithProvider } from "./auth";
import supabase from "./supabase";
import app from "./firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import { loginAtom } from "./store/loginAtom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [_, setLogin] = useRecoilState(loginAtom);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.setCustomParameters({
    prompt: "select_account",
  });
  const auth = getAuth();
  const handleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      // TODO: add user profile to top right corner.
      console.log("user", user);
      console.log("token", token);
      navigate("/search");
      toast("Login Successful!");
      setLogin(true);
    });
  };
  return (
    <div>
      <GoogleLoginButton onClick={handleLogin} />
      <ToastContainer />
    </div>
  );
};
export default Login;
