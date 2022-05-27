import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import CargarFeedback from "../../firebase/CargarFeedback";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import getDb from "../../firebase/getDb";
import { doc, getDoc } from "firebase/firestore";
import Colors from "../../utilities/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const NuevoFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTema, setSelectedTema] = useState("select");
  const [text, onChangeText] = useState("");
  const [image, setImage] = useState(null);
  const [imagenSubir, setImagenSubir] = useState(null);
  const [db, app] = getDb();
  const auth = getAuth();
  const [usuario, setUsuario] = useState({
    dni: "",
    ol: "",
    creador: "",
  });
  const mailtag = "_choferescmq@miruta.com";

  // crear función traer datos de usuario

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const dni = user.email.split("_")[0];
        getInfo(dni + mailtag);
      } else {
        return {};
      }
    });
  }

  const getInfo = async (dni) => {
    const docRef = doc(db, "usuarios", dni);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUsuario(() => docSnap.data());
    } else {
      window.alert("Error en la consulta al servidor.");
    }
  };

  const handleCargar = () => {
    setLoading(true);
    if (selectedTema === "select") {
      alert("Seleccione el motivo");
      setLoading(false);
      return;
    }
    if (text.trim() === "") {
      alert("Escriba la sugerencia");
      setLoading(false);
      return;
    }
    CargarFeedback(
      {
        dni: usuario.dni,
        estado: "Pendiente",
        motivo: selectedTema,
        detalle: text,
        ol: usuario.ol,
        creador: usuario.nombre + " " + usuario.apellido,
      },
      imagenSubir,
      setLoading,
      onChangeText,
      setImage,
      setImagenSubir
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      getBlobFroUri(result.uri);
    }
  };

  const getBlobFroUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    setImagenSubir(blob);
  };

  return (
    <View style={{ minHeight: "100%", backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.container}>
          <Picker
            mode="dropdown"
            selectedValue={selectedTema}
            onValueChange={(itemValue) => setSelectedTema(itemValue)}
            style={{ height: 40, fontSize: 16 }}
          >
            <Picker.Item label="Seleccione un motivo" value="select" />
            <Picker.Item label="Problemas con la carga" value="cargas" />
            <Picker.Item label="Clientes conflictivos" value="clientes" />
            <Picker.Item label="Seguridad" value="seguridad" />
            <Picker.Item label="Ideas para mejorar" value="ideas" />
            <Picker.Item label="Otro motivo" value="otros" />
          </Picker>

          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            multiline
            numberOfLines={10}
            placeholder="Escriba la sugerencia"
          />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 150,
                  height: 150,
                  marginTop: 18,
                  borderWidth: 1,
                  marginBottom: 12,
                }}
              />
            )}
            <View
              style={{
                marginVertical: 12,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {loading ? (
                <ActivityIndicator
                  size="large"
                  animating={loading}
                  color={Colors.primary}
                  style={{
                    marginVertical: 12,
                    opacity: 1,
                    marginHorizontal: "auto",
                  }}
                />
              ) : (
                <>
                  <Pressable onPress={pickImage} style={styles.pickImg}>
                    <FontAwesome name="picture-o" size={22} color="white" />
                    <Text style={{ color: "white", fontSize: 14 }}>
                      {" "}
                      Opcional
                    </Text>
                  </Pressable>
                  <Pressable onPress={handleCargar} style={styles.pickImg}>
                    <Entypo name="upload" size={22} color="white" />
                    <Text style={{ color: "white", fontSize: 14 }}>
                      {" "}
                      Cargar Feedback
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    marginTop: 8,
  },
  pickerContainer: {
    width: "100%",
    marginVertical: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "blue",
  },
  picker: {
    fontSize: 16,
    borderColor: "rgba(0,0,0,0.4)",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  motivo: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    padding: 4,
    fontSize: 16,
    width: "100%",
    marginBottom: 16,
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 12,
  },
  imgContainer: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  pickImg: {
    backgroundColor: Colors.titleBackground,
    display: "flex",
    flexDirection: "row",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NuevoFeedback;
