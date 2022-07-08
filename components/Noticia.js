import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../utilities/Colors";
import Bolder from "../components/Bolder";

const Noticia = ({ data }) => {
  const { cd, fecha, imgurl, texto, titulo } = data.data;
  const fechaFormatted = new Date(Date.parse(fecha)).toLocaleDateString();

  return (
    <View style={styles.container}>
      <View style={styles.tituloBox}>
        <Bolder color={Colors.titleBackground}>
          <Text style={styles.titulo}>{titulo} </Text>
        </Bolder>
        <View style={styles.fechaBox}>
          <Text style={styles.subtitulo}>{cd + " " + fechaFormatted}</Text>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.imagen} source={{ uri: imgurl }} />
      </View>
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "96%",
    backgroundColor: Colors.fill,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "rgba(0,0,0,0.4)",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
  },
  imgContainer: { display: "flex", alignItems: "center" },
  imagen: {
    height: 300,
    width: 300,
    marginHorizontal: "auto",
    marginTop: 20,
    marginBottom: 12,
    resizeMode: "cover",
    borderRadius: 8,
  },
  tituloBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "white",
    overflow: "visible",
    marginHorizontal: -10,
    // marginTop: -10,
    // paddingTop: 8,
    paddingHorizontal: 12,
  },
  fechaBox: {
    display: "flex",
  },
  titulo: {
    fontSize: 18,
  },
  subtitulo: { color: Colors.titleBackground, fontSize: 12 },
  texto: { fontSize: 16, paddingVertical: 6 },
});

export default Noticia;
