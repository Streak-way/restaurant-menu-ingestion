// import supabase from "./supabase";
import app from "./firebase";

export async function loginWithProvider(providerName) {
  //  firebase google login
  if (providerName === "google") {
    const provider = new app.auth.GoogleAuthProvider();
    const { user } = await app.auth().signInWithPopup(provider);
    console.log("user", user);
  }
  // try {
  //   console.log(" calling providerName", providerName, "supabase", supabase);
  //   debugger;
  //   const { data, error, user, session } = await supabase.auth.signInWithOAuth({
  //     provider: providerName,
  //     options: {
  //       redirectTo: "http://localhost:3000",
  //     },
  //   });
  //   console.log("data", data, "error", error);
  // } catch (error) {
  //   console.log("error", error);
  // }
}

// export async function signout() {
//   try {
//     const { error } = await supabase.auth.signOut();
//     console.log("error", error);
//   } catch (error) {
//     console.log("error", error);
//   }
// }
