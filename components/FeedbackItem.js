import { View, StyleSheet, Text } from "react-native";
import { Link } from "@react-navigation/native";
import React from "react";

const FeedbackItem = ({ datos }) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.headText}>{datos.fecha}</Text>
        <Text style={styles.headText}>{datos.motivo}</Text>
        <Text style={styles.headText}>{datos.estado}</Text>
      </View>
      <Text style={styles.descText}>{datos.detalle}</Text>
      <Link to={{ screen: "FeedbackFull", params: { datos } }}>Ver más</Link>
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
  descText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "left",
    width: "100%",
  },
});
export default FeedbackItem;
