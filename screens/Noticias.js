import {
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import getNoticias from "../firebase/getNoticias";
import Noticia from "../components/Noticia";
import Colors from "../utilities/Colors";
import { initializeApp } from "firebase/app";
import FirebaseConfig from "../firebase/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Noticias = ({ navigation }) => {
  const [noticias, setNoticias] = useState([]);
  const [update, setUpdate] = useState(0);
  const [autenticado, setAutenticado] = useState(true);
  const app = initializeApp(FirebaseConfig);
  const auth = getAuth();

  useEffect(() => {
    async function getData() {
      try {
        const data = await getNoticias();
        setNoticias(data);
      } catch (error) {
        console.log("Error leyendo noticias");
      }
    }
    getData();
  }, [update]);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setAutenticado(true);
  //       // ...
  //     } else {
  //       alert("Inicie Sesión");
  //       navigation.navigate("Login");
  //     }
  //   });
  // }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            setUpdate(update + 1);
          }}
        />
      }
    >
      {autenticado && (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginVertical: 12,
            minHeight: "100%",
            width: "100%",
            paddingBottom: 60,
            backgroundColor: Colors.backgroundColor,
          }}
        >
          {noticias.map((nov, index) => {
            return <Noticia data={nov} key={index} />;
          })}
        </View>
      )}
      {!autenticado && (
        <View>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                padding: 10,
              }}
            >
              Inicie Sesión
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default Noticias;
