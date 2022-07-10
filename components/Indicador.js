import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function Indicador({ datos }) {
  //llega el indicador y un objeto con el valor y el target para comparar
  const { tgt, valor, texto, flag } = datos;
  const evaluate = (val) => {
    switch (texto) {
      case "Roturas en reparto (DQI)":
        return (val * 1).toFixed(2) + "ppm";
        break;
      case "Puntaje RMD":
        return val;
        break;
      default:
        return (val * 100).toFixed(2) + "%";
    }
  };

  const pulgar = () => {
    if (flag == "menor") {
      if (valor <= tgt) {
        return <FontAwesome name="check" size={42} color="green" />;
      } else {
        return <Feather name="alert-circle" size={42} color="#FF1700" />;
      }
    } else {
      if (valor >= tgt) {
        return <FontAwesome name="check" size={42} color="green" />;
      } else {
        return <Feather name="alert-circle" size={42} color="#FF1700" />;
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.datosContainer}>
          <Text style={styles.titulo}>{texto}</Text>
          <Text style={styles.titulo}>
            {evaluate(valor)}{" "}
            {texto == "Puntaje RMD" && (
              <Entypo name="star" size={20} color="black" />
            )}
          </Text>
          <Text style={styles.analisis}>
            Objetivo: {evaluate(tgt)}{" "}
            {texto == "Puntaje RMD" && (
              <Entypo name="star" size={16} color="black" />
            )}
          </Text>
        </View>
        <View style={styles.icon}>{pulgar()}</View>
      </View>
      {/* <View style={styles.separador} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 8,
  },
  topContainer: {
    flexDirection: "row",
    width: "96%",
    backgroundColor: "#FFF",
    paddingVertical: 12,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
  datosContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  titulo: { fontWeight: "bold", fontSize: 20 },
  analisis: { fontSize: 14 },
  separador: {
    width: "96%",
    height: 2,
    backgroundColor: "#D3D3D3",
  },
});
