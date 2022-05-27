import { View, StyleSheet, Text, Image } from "react-native";
import React from "react";

const FeedbackFull = ({ route }) => {
  const datos = route.params.datos;
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.headText}>{datos.fecha}</Text>
        <Text style={styles.headText}>{datos.motivo}</Text>
        <Text style={styles.headText}>{datos.estado}</Text>
      </View>
      <Text style={styles.descText}>{datos.detalle}</Text>
      {datos.imgurl && <Image style={styles.imagen} source={datos.imgurl} />}
      {datos.respuesta && (
        <>
          <Text style={styles.respuestaText}>
            Respuesta de {datos.usuarioRespuesta + " :"}
          </Text>
          <Text style={styles.headText}>{datos.respuesta}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 8,
    marginTop: 12,
  },
  head: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headText: {
    fontSize: 16,
    marginBottom: 16,
  },
  respuestaText: { fontSize: 16, textAlign: "left", marginTop: 16 },
  descText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "left",
    width: "100%",
  },
  imagen: {
    marginTop: 8,
    height: 350,
    width: "100%",
  },
});
export default FeedbackFull;
