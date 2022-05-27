// Busca y retorna usuario from db
import { doc, getDoc } from "firebase/firestore";
import getDb from "./getDb";

const getUser = async (userId) => {
  const [db] = getDb();
  const docRef = doc(db, "usuarios", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export default getUser;
