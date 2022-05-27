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
        <Bolder color={"white"}>
          <Text style={styles.titulo}>{titulo} </Text>
        </Bolder>
        <View style={styles.fechaBox}>
          <Text style={styles.subtitulo}>{cd}</Text>
          <Text style={styles.subtitulo}>{fechaFormatted}</Text>
        </View>
      </View>
      <Image style={styles.imagen} source={imgurl} />
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.fill,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 20,
  },
  imagen: {
    marginTop: 8,
    height: 300,
    width: "100%",
    marginHorizontal: "auto",
    marginTop: 20,
    marginBottom: 12,
    resizeMode: "cover",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  tituloBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.titleBackground,
    overflow: "visible",
    marginHorizontal: -10,
    marginTop: -10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  fechaBox: {
    display: "flex",
  },
  titulo: {
    fontSize: 18,
  },
  subtitulo: { color: "white", fontSize: 12 },
  texto: { fontSize: 16, paddingVertical: 6 },
});

export default Noticia;
