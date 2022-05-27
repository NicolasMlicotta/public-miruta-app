// Utiliza onAuthStateChanged para verificar si está logueado y returna id / dni
import { getAuth } from "firebase/auth";
const isLogged = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return auth.currentUser.email.split("_")[0];
  } else {
    return false;
  }
};
export default isLogged;
