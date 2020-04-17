import firebase from "firebase";
import config from "../configs/firebase.config";
import { apiUrl } from "../constants/constants";
import axios from "axios";
const googleLogin = async () => {
  firebase.initializeApp(config);
  let provider = new firebase.auth.GoogleAuthProvider();
  const authRes = await firebase.auth().signInWithPopup(provider);
  const userDetails = {
    displayName: authRes.user.displayName,
    email: authRes.user.email,
    userId: authRes.user.uid
  };
  const firebasePost = await axios.post(
    `${apiUrl}/signupGoogleUser`,
    userDetails
  );
  return firebasePost;
};

export default googleLogin;
