import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import FirebaseConfig from "../firebase/FirebaseConfig";
import getDni from "../firebase/getDni";
import Colors from "../utilities/Colors";

function Login({ navigation }) {
  initializeApp(FirebaseConfig);
  const auth = getAuth();
  const mailtag = "_choferescmq@miruta.com";
  const password = "123456";
  const [usuario, setUsuario] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [dni, setDni] = useState("");

  const handleLogin = () => {
    if (usuario == "") {
      alert("Escriba su dni");
      return;
    }
    const email = usuario + mailtag;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        alert("Bienvenido");
        navigation.navigate("Indicadores");
        // ...
      })
      .catch((error) => {
        console.log(error.message);
        alert("Error. Por favor intente nuevamente.");
      });
  };

  useEffect(() => {
    //verificar si está logueado
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLogueado(true);
        setDni(user.email.split("_")[0]);
        // ...
      } else {
        // User is signed out
        // ...
        setLogueado(false);
        setDni("");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* FORMULARIO INICIO SESIÓN */}
      {!logueado ? (
        <>
          <TextInput
            onChangeText={setUsuario}
            value={usuario}
            placeholder="Escriba su DNI"
            style={styles.textInput}
            keyboardType="numeric"
          />
          <View style={styles.btnContainer}>
            <Button
              title="Iniciar Sesión"
              onPress={handleLogin}
              color={Colors.titleBackground}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 16 }}>Iniciaste sesión con DNI: {dni}</Text>
          <View style={styles.btnContainer}>
            <Button
              title="Cerrar Sesión"
              color={Colors.titleBackground}
              onPress={() => {
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: "10%",
    marginTop: 8,
    width: "96%",
    backgroundColor: Colors.fill,
    padding: 14,
    justifyContent: "center",
    marginHorizontal: "auto",

    borderColor: "rgba(0,0,0,0.4)",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 14,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});

export default Login;
