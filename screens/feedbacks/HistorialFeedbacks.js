import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import FeedbackItem from "../../components/FeedbackItem";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  collection,
  orderBy,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import getDb from "../../firebase/getDb";
import getDni from "../../firebase/getDni";
import { getAuth } from "firebase/auth";
import Colors from "../../utilities/Colors";

const [app] = getDb();
const auth = getAuth();

const HistorialFeedbacks = ({ navigation }) => {
  //"Pendiente" | "Resuelto"
  const [filtro, setFiltro] = useState("Pendiente");
  const [datos, setDatos] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [id, setId] = useState(false);

  const GetFeedbacks = async (email) => {
    const [db] = getDb();
    let arr = [];
    const q = query(
      collection(db, "feedbacks"),
      where("dni", "==", email),
      orderBy("fecha", "desc"),
      limit(50)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let val = doc.data();
      val.fecha = new Date(val.fecha.seconds * 1000).toLocaleDateString();
      arr.push(val);
    });
    setDatos(arr);
    handleFiltro("Pendiente", arr);
  };

  useEffect(() => {
    GetFeedbacks(getDni());
    setId(getDni());
  }, []);

  const handleFiltro = (value, array) => {
    setFiltro(value);
    const filtrado = array.filter((feedback) => {
      return feedback.estado == value;
    });
    setDatosFiltrados(filtrado);
  };

  const handleUpdate = () => {
    GetFeedbacks(id);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: "80vh" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 12,
          }}
        >
          <Picker
            selectedValue={filtro}
            onValueChange={(itemValue) => handleFiltro(itemValue, datos)}
          >
            <Picker.Item label="Pendientes" value="Pendiente" />
            <Picker.Item label="Resueltos" value="Resuelto" />
          </Picker>
          <Pressable onPress={handleUpdate}>
            <FontAwesome name="refresh" size={24} color="black" />
          </Pressable>
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          {datosFiltrados.map((feedback, index) => {
            return <FeedbackItem datos={feedback} key={index} />;
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 70,
          position: "absolute",
          top: "90%",
          right: 10,
        }}
        onPress={() => navigation.navigate("NuevoFeedback")}
      >
        <AntDesign name="pluscircle" size={40} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    minHeight: "100%",
  },
});
export default HistorialFeedbacks;
