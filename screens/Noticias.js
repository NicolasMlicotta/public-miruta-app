import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import getNoticias from "../firebase/getNoticias";
import Noticia from "../components/Noticia";
import Colors from "../utilities/Colors";

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const data = await getNoticias();
        setNoticias(data);
      } catch (error) {
        console.log("Error leyendo noticias", error);
      }
    }
    getData();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          width: "94%",
          marginHorizontal: "auto",
          marginVertical: 12,
          minHeight: "100%",
          paddingBottom: 60,
          backgroundColor: Colors.backgroundColor,
        }}
      >
        {noticias.map((nov, index) => {
          return <Noticia data={nov} key={index} />;
        })}
      </View>
    </ScrollView>
  );
};

export default Noticias;
