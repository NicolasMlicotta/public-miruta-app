import { View, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import getNoticias from "../firebase/getNoticias";
import Noticia from "../components/Noticia";
import Colors from "../utilities/Colors";

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  async function getData() {
    try {
      const data = await getNoticias();
      setNoticias(data);
    } catch (error) {
      alert("Error leyendo noticias");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            getData();
          }}
        />
      }
    >
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
          return <Noticia datos={nov} key={index} />;
        })}
      </View>
    </ScrollView>
  );
};

export default Noticias;
