import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import FirebaseConfig from "./FirebaseConfig";

function getDb() {
  const app = initializeApp(FirebaseConfig);
  const db = getFirestore(app);
  return [db, app];
}

export default getDb;
