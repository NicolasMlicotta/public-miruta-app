import { initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";
import FirebaseConfig from "../firebase/FirebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CargarFeedback = (
  data,
  imagen,
  setLoading,
  onChangeText,
  setImage,
  setImagenSubir
) => {
  const app = initializeApp(FirebaseConfig);
  const db = getFirestore(app);
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  const metadata = {
    contentType: "image/jpeg",
  };
  const objeto = {
    fecha: fecha,
    anio: anio,
    mes: mes,
    dia: dia,
    dni: data.dni,
    estado: "Pendiente",
    motivo: data.motivo,
    detalle: data.detalle,
    ol: data.ol,
    creador: data.creador,
  };

  const SubirDoc = (objeto) => {
    const db = getFirestore(app);
    addDoc(collection(db, "feedbacks"), objeto).then((docRef) => {
      if (imagen != null) {
        uploadImage(imagen, docRef.id);
      } else {
        alert("Feedback cargado correctamente");
        setLoading(false);
        onChangeText("");
        setImage(null);
        setImagenSubir(null);
      }
    });
  };

  const uploadImage = (imagen, id) => {
    const storage = getStorage(app);
    const ruta = "imagenesfeedbacks/" + id;
    const reference = ref(storage, ruta);
    uploadBytes(reference, imagen, metadata)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        updateDoc(doc(db, "feedbacks/", id), { imgurl: downloadURL }).then(
          () => {
            setLoading(false);
            alert("Feedback cargado correctamente");
            onChangeText("");
            setImage(null);
            setImagenSubir(null);
          }
        );
      });
  };

  SubirDoc(objeto);
};

export default CargarFeedback;
