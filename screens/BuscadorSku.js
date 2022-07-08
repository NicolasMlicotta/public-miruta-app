import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import FirebaseConfig from "../firebase/FirebaseConfig";
import Colors from "../utilities/Colors";
import { Ionicons } from "@expo/vector-icons";
import Bolder from "../components/Bolder";

const BuscadorSku = () => {
  const [number, onChangeNumber] = React.useState("");
  const [data, setData] = React.useState(false);
  const [cargando, setCargando] = React.useState(false);

  // Initialize Firebase
  const app = initializeApp(FirebaseConfig);
  const db = getFirestore(app);
  const simpleAlertHandler = (text) => {
    //function to make simple alert
    alert(text);
  };

  const leer = async (sku) => {
    setCargando(true);
    if (number == "") {
      setCargando(false);
      simpleAlertHandler("Introduzca un SKU.");
      return;
    }
    const docRef = doc(db, "skudb", sku);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
      setCargando(false);
    } else {
      // doc.data() will be undefined in this case
      onChangeNumber("");
      simpleAlertHandler("No existe ese SKU. Consulte con la oficina.");
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="SKU"
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Buscar SKU"
            color={Colors.titleBackground}
            onPress={() => leer(number.toString())}
          />
        </View>
      </View>
      {cargando && (
        <ActivityIndicator
          size="large"
          animating={cargando}
          style={{ marginTop: 12 }}
        />
      )}
      {data != false ? (
        <View style={styles.infoContainer}>
          <Text style={styles.textoSku}>
            <Bolder>SKU: </Bolder>
            {data.idsku}
          </Text>
          <Text style={styles.textoSku}>
            <Bolder>Tipo: </Bolder>
            {data.Tipo}
          </Text>
          <Text style={styles.textoSku}>
            <Bolder>Descripción: </Bolder>
            {data.Descripcion}
          </Text>
          <Text style={styles.textoSku}>
            <Bolder>Unidades por bulto: </Bolder>
            {data.UnidadesBulto}
          </Text>
          {data.ImgUrl ? (
            <Image style={styles.imagen} source={{ uri: data.ImgUrl }} />
          ) : (
            <View style={styles.imgPlaceholder}>
              <Ionicons name="beer" size={60} color={Colors.titleBackground} />
              <Text>Imagen no disponible</Text>
            </View>
          )}
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

// To create a button with a custom style, we can to turn to the <Pressable />
//component.<Pressable />lets us fully customize the appearance of a pressable element (like a button),
//in addition to allowing us to customize its behavior.

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    minHeight: "100%",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 8,
    width: "80%",
  },
  input: {
    height: 42,
    borderWidth: 1,
    padding: 4,
    fontSize: 18,
    backgroundColor: Colors.fill,
    width: "40%",
  },
  buttonContainer: {
    alignItems: "center",
  },
  infoContainer: {
    width: "90%",
    paddingHorizontal: 8,
    paddingBottom: 12,
    backgroundColor: Colors.fill,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 8,
    marginTop: 10,
  },
  textoSku: {
    fontSize: 20,
    marginTop: 12,
  },
  imagen: {
    marginTop: 8,
    height: 350,
    width: "100%",
  },
  imgPlaceholder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 32,
  },
});

export default BuscadorSku;
