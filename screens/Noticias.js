import { View, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import getNoticias from "../firebase/getNoticias";
import Noticia from "../components/Noticia";
import Colors from "../utilities/Colors";

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [update, setUpdate] = useState(0);

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
  }, [update]);

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
    </ScrollView>
  );
};

export default Noticias;
