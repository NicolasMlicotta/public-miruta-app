import React from "react";
import { Button, StyleSheet } from "react-native";

function CustomButton({ title, onPress, color, size }) {
  return (
    <div>
      <Button title="Iniciar Sesión" onPress={handleLogin} style={style.size} />
    </div>
  );
}

const style = StyleSheet.create({
  xl: {
    backgroundColor: color,
    fontSize: 24,
    fontWeight: "bold",
  },
  m: {
    backgroundColor: color,
    fontSize: 18,
  },
});

export default CustomButton;
