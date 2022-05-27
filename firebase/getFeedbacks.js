import {
  collection,
  orderBy,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";

import getDb from "./getDb";

function getFeedbacks(email) {
  const [db] = getDb();
  const datos = [];

  const fetchData = async () => {
    const q = query(
      collection(db, "feedbacks"),
      where("dni", "==", email),
      orderBy("fecha", "desc"),
      limit(100)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let val = doc.data();
      val.fecha = new Date(val.fecha.seconds * 1000).toLocaleDateString();
      datos.push(val);
    });

    return datos;
  };
  fetchData();
}

export default getFeedbacks;
