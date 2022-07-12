import { collection, query, getDocs, limit, orderBy } from "firebase/firestore";
import getDb from "./getDb";
async function getNoticias() {
  const [db] = getDb();
  try {
    const items = [];
    const q = query(
      collection(db, "novedades"),
      limit(15),
      orderBy("fechaCreacion", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const tempData = { key: doc.id, data: doc.data() };
      items.push(tempData);
    });
    return items;
  } catch (error) {
    return [error];
  }
}

export default getNoticias;
