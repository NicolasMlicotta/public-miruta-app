import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import FirebaseConfig from "./FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

const IsLogged = () => {
  initializeApp(FirebaseConfig);
  const navigation = useNavigation();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // console.log(user.uid);
      // console.log(user);
      // return user.email;
      return true;
      // ...
    } else {
      alert("Inicie Sesión");
      navigation.navigate("Login");
      return;
    }
    // User is signed out
    // ...
  });
};
export default IsLogged;
