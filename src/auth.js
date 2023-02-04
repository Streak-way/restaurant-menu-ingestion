import app from "./firebase";

export async function loginWithProvider(providerName) {
  //  firebase google login
  if (providerName === "google") {
    const provider = new app.auth.GoogleAuthProvider();
    const { user } = await app.auth().signInWithPopup(provider);
    console.log("user", user);
  }
}
