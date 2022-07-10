import { initializeApp } from "firebase/app";
import FirebaseConfig from "../firebase/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import Indicador from "../components/Indicador";

import Colors from "../utilities/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Indicadores = ({ navigation }) => {
  const app = initializeApp(FirebaseConfig);
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [indicadores, setIndicadores] = useState([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [filterAnio, setFilterAnio] = useState("2022");
  const [filterMes, setFilterMes] = useState("seleccione");
  const [mostrarFechas, setMostrarFechas] = useState(true);
  const [fechaFiltrada, setFechaFiltrada] = useState({});
  const [autenticado, setAutenticado] = useState(false);

  const clean = (valor) => {
    return parseFloat(valor.replace(/,/, "."));
  };

  const reduceInfo = (querySnap) => {
    //acumuladores
    let counter = 0;
    let bultos_rechazados = 0;
    let bultos_ruteado = 0;
    let dispersion_km = 0;
    let dispersion_tiempos = 0;
    let dqi = 0;
    let eficacia_modulaciones = 0;
    let inicio_cierre = 0;
    let modulaciones = 0;
    let no_modulados = 0;
    let ontime_uso = 0;
    let pedidos_ruteados = 0;
    let pedidos_rechazados = 0;
    let rmd_cantidad = 0;
    let rmd_puntaje = 0;

    //para totales
    let porcentaje_pedidos_rechazados = 0;
    let porcentaje_bultos_rechazados = 0;
    let prom_disp_km = 0;
    let prom_disp_tiempo = 0;
    let prom_inicio_cierre = 0;
    let prom_uso_ontime = 0;
    let prom_rmd = 0;
    let prom_dqi = 0;
    let prom_eficacia_mod = 0;
    let prom_rmd_cantidad = 0;
    //targets
    let tgt_pedidos_rechazados = 0;
    let tgt_bultos_rechazados = 0;
    let tgt_prom_disp_km = 0;
    let tgt_prom_disp_tiempo = 0;
    let tgt_prom_dqi = 0;
    let tgt_prom_eficacia_mod = 0;
    let tgt_prom_inicio_cierre = 0;
    let tgt_prom_uso_ontime = 0;
    let tgt_rmd_cantidad = 0;
    let tgt_prom_rmd = 0;

    querySnap.forEach((doc) => {
      let val = doc.data();
      bultos_rechazados += clean(val.bultos_rechazados);
      bultos_ruteado += clean(val.bultos_ruteado);
      dispersion_km += clean(val.dispersion_km);
      dispersion_tiempos += clean(val.dispersion_tiempos);
      dqi += clean(val.dqi);
      eficacia_modulaciones += clean(val.eficacia_modulaciones);
      inicio_cierre += clean(val.inicio_cierre);
      modulaciones += clean(val.modulaciones);
      no_modulados += clean(val.no_modulados);
      ontime_uso += clean(val.ontime_uso);
      pedidos_ruteados += clean(val.pedidos_ruteados);
      pedidos_rechazados += clean(val.pedidos_rechazados);
      rmd_cantidad += clean(val.rmd_cantidad);
      rmd_puntaje += clean(val.rmd_puntaje);
      //targets (10)
      tgt_pedidos_rechazados += clean(val.tgt_pedidos_rechazados);
      tgt_bultos_rechazados += clean(val.tgt_bultos_rechazados);
      tgt_prom_disp_km += clean(val.tgt_prom_disp_km);
      tgt_prom_disp_tiempo += clean(val.tgt_prom_disp_tiempo);
      tgt_prom_dqi += clean(val.tgt_prom_dqi);
      tgt_prom_eficacia_mod += clean(val.tgt_prom_eficacia_mod);
      tgt_prom_inicio_cierre += clean(val.tgt_prom_inicio_cierre);
      tgt_prom_uso_ontime += clean(val.tgt_prom_uso_ontime);
      tgt_rmd_cantidad += clean(val.tgt_rmd_cantidad);
      tgt_prom_rmd += clean(val.tgt_prom_rmd);
      //contador
      counter += 1;

      if (counter == 1) {
        setMaxDate(val.fecha);
        setMinDate(val.fecha);
      } else {
        setMinDate(val.fecha);
      }
    });
    //valores (10)
    porcentaje_pedidos_rechazados = pedidos_rechazados / pedidos_ruteados;
    porcentaje_bultos_rechazados = bultos_rechazados / bultos_ruteado;
    prom_disp_km = dispersion_km / counter;
    prom_disp_tiempo = dispersion_tiempos / counter;
    prom_inicio_cierre = inicio_cierre / counter;
    prom_uso_ontime = ontime_uso / counter;
    if (rmd_cantidad > 0) {
      prom_rmd = rmd_puntaje / rmd_cantidad;
    } else {
      prom_rmd = "Sin puntajes";
    }
    if (dqi > 0) {
      prom_dqi = dqi / counter;
    } else {
      prom_dqi = 0;
    }

    prom_eficacia_mod = eficacia_modulaciones / counter;
    prom_rmd_cantidad = rmd_cantidad / counter;

    //targets (10)
    tgt_pedidos_rechazados = tgt_pedidos_rechazados / counter;
    tgt_bultos_rechazados = tgt_bultos_rechazados / counter;
    tgt_prom_disp_km = tgt_prom_disp_km / counter;
    tgt_prom_disp_tiempo = tgt_prom_disp_tiempo / counter;
    tgt_prom_inicio_cierre = tgt_prom_inicio_cierre / counter;
    tgt_prom_dqi = tgt_prom_dqi / counter;
    tgt_prom_eficacia_mod = tgt_prom_eficacia_mod / counter;
    tgt_prom_uso_ontime = tgt_prom_uso_ontime / counter;
    tgt_rmd_cantidad = tgt_rmd_cantidad / counter;
    tgt_prom_rmd = tgt_prom_rmd / counter;
    // tambien hay que poner valores promedio para los targets
    //10 indicadores
    setIndicadores([
      {
        tgt: tgt_prom_rmd,
        valor: prom_rmd,
        texto: "Puntaje RMD",
        flag: "mayor",
      },
      {
        tgt: tgt_rmd_cantidad,
        valor: prom_rmd_cantidad,
        texto: "PDV Puntuados",
        flag: "mayor",
      },
      {
        tgt: tgt_pedidos_rechazados,
        valor: porcentaje_pedidos_rechazados,
        texto: "Pedidos Rechazados",
        flag: "menor",
      },
      {
        tgt: tgt_bultos_rechazados,
        valor: porcentaje_bultos_rechazados,
        texto: "Bultos Rechazados",
        flag: "menor",
      },
      {
        tgt: tgt_prom_eficacia_mod,
        valor: prom_eficacia_mod,
        texto: "Eficacia de modulaciones",
        flag: "mayor",
      },
      {
        tgt: tgt_prom_dqi,
        valor: prom_dqi,
        texto: "Roturas en reparto (DQI)",
        flag: "menor",
      },
      {
        tgt: tgt_prom_uso_ontime,
        valor: prom_uso_ontime,
        texto: "Uso de Bees Delivery",
        flag: "mayor",
      },
      {
        tgt: tgt_prom_inicio_cierre,
        valor: prom_inicio_cierre,
        texto: "Bees - Inicio y cierre",
        flag: "mayor",
      },
      {
        tgt: tgt_prom_disp_km,
        valor: prom_disp_km,
        texto: "Dispersión en km",
        flag: "menor",
      },
      {
        tgt: tgt_prom_disp_tiempo,
        valor: prom_disp_tiempo,
        texto: "Dipersión en tiempos",
        flag: "menor",
      },
    ]);
  };
  const fetchData = async (ref, diez) => {
    // https://firebase.google.com/docs/firestore/query-data/get-data
    if (ref == "") {
      alert("Inicie Sesión");
      navigation.navigate("Login");
    } else {
      const db = getFirestore(app);
      if (filterMes == "todos") {
        const q = query(
          collection(db, "dailyupload/" + "driversdata/" + ref),
          where("anio", "==", filterAnio)
        );
        reduceInfo(await getDocs(q));
      } else if (filterMes != "seleccione") {
        const q = query(
          collection(db, "dailyupload/" + "driversdata/" + ref),
          where("mes", "==", filterMes),
          where("anio", "==", filterAnio)
        );
        reduceInfo(await getDocs(q));
      } else if (diez) {
        const q = query(
          collection(db, "dailyupload/" + "driversdata/" + ref),
          orderBy("aniomesdia", "desc"),
          limit(10)
        );
        reduceInfo(await getDocs(q));
      } else {
        const q = query(
          collection(db, "dailyupload/" + "driversdata/" + ref),
          orderBy("aniomesdia", "desc"),
          limit(1)
        );
        reduceInfo(await getDocs(q));
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //armar if mail != "" fetch data
      if (user) {
        setEmail(user.email.split("_")[0]);
        fetchData(user.email.split("_")[0]);
        setAutenticado(true);
        // ...
      } else {
        alert("Inicie Sesión");
        navigation.navigate("Login");
      }
    });
  }, []);

  const handleFiltros = () => {
    fetchData(email);
    setMostrarFechas(false);
    let mesOk = filterMes == "seleccione" ? "" : filterMes;
    setFechaFiltrada({ anio: " Año: " + filterAnio, mes: "Mes: " + mesOk });
    handleModal(false);
  };

  const handleClickDiez = () => {
    fetchData(email, true);
    setMostrarFechas(false);
    handleModal(false);
    setFechaFiltrada({ anio: "", mes: "Últimos 10 repartos" });
  };

  const handleClickUltimo = () => {
    fetchData(email);
    setMostrarFechas(false);
    handleModal(false);
    setMostrarFechas(true);
  };

  const handleModal = (bool) => {
    setMostrarFiltros(bool);
    setFilterMes("seleccione");
    setFilterAnio("2022");
  };

  return (
    <SafeAreaView style={styles.container}>
      {autenticado && (
        <ScrollView>
          <View style={styles.botonesContainer}>
            <View style={styles.fecha}>
              {mostrarFechas ? (
                <Text>{minDate + " - " + maxDate}</Text>
              ) : (
                <Text>{fechaFiltrada.mes + " " + fechaFiltrada.anio}</Text>
              )}
            </View>
            <Pressable
              style={styles.iconbox}
              onPress={() => handleModal(!mostrarFiltros)}
            >
              <FontAwesome name="filter" size={24} color="black" />
            </Pressable>
          </View>
          {mostrarFiltros && (
            <View style={{ paddingHorizontal: 14 }}>
              <View>
                <B>Año</B>
                <Picker
                  selectedValue={filterAnio}
                  onValueChange={(itemValue) => setFilterAnio(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="2022" value="2022" />
                  <Picker.Item label="2023" value="2023" />
                </Picker>
                <B>Mes</B>
                <Picker
                  selectedValue={filterMes}
                  onValueChange={(itemValue) => setFilterMes(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Seleccione" value="seleccione" />
                  <Picker.Item label="Enero" value="1" />
                  <Picker.Item label="Febrero" value="2" />
                  <Picker.Item label="Marzo" value="3" />
                  <Picker.Item label="Abril" value="4" />
                  <Picker.Item label="Mayo" value="5" />
                  <Picker.Item label="Junio" value="6" />
                  <Picker.Item label="Julio" value="7" />
                  <Picker.Item label="Agosto" value="8" />
                  <Picker.Item label="Septiembre" value="9" />
                  <Picker.Item label="Octubre" value="10" />
                  <Picker.Item label="Noviembre" value="11" />
                  <Picker.Item label="Diciembre" value="12" />
                  <Picker.Item label="Todos" value="todos" />
                </Picker>
              </View>
              <Pressable onPress={handleFiltros} style={styles.botonSemanas}>
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 14 }}
                >
                  Filtrar Indicadores
                </Text>
              </Pressable>
              <View>
                <Text style={{ marginTop: 40 }}>
                  <B>También podés elegir:</B>
                </Text>
              </View>
              <View style={styles.otrasOpciones}>
                <Pressable onPress={handleClickUltimo} style={styles.opcion}>
                  <MaterialIcons name="filter-1" size={24} color="black" />
                  <Text style={styles.verOtros}> Ver último reparto</Text>
                </Pressable>
                <Pressable onPress={handleClickDiez} style={styles.opcion}>
                  <MaterialCommunityIcons
                    name="numeric-10-box-multiple-outline"
                    size={24}
                    color="black"
                  />
                  <Text style={styles.verOtros}> Ver últimos 10 repartos</Text>
                </Pressable>
              </View>
            </View>
          )}
          {!mostrarFiltros && (
            <View style={styles.scrollView}>
              {indicadores.map((objeto) => {
                return <Indicador datos={objeto} key={objeto.texto} />;
              })}
            </View>
          )}
        </ScrollView>
      )}
      {!autenticado && (
        <View style={styles.scrollView}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                padding: 10,
              }}
            >
              Inicie Sesión
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

const B = (props) => (
  <Text style={{ fontWeight: "bold", color: Colors.primary, fontSize: 16 }}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    width: "100%",
  },
  botonesContainer: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  fecha: {
    height: 30,
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  iconbox: {
    width: 60,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  botonSemanas: {
    marginTop: 50,
    backgroundColor: Colors.titleBackground,
    width: "auto",
    paddingHorizontal: 14,
    paddingVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    marginBottom: 8,
    borderRadius: 16,
  },
  scrollView: { display: "flex", alignItems: "center" },
  text: {
    fontSize: 42,
  },
  picker: {
    height: 32,
    marginBottom: 20,
    borderColor: "red",
    backgroundColor: "#f9f9f9c9",
  },
  otrasOpciones: {
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: 12,
  },
  opcion: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
    marginTop: 12,
  },
  verOtros: {
    fontSize: 18,
    textDecorationLine: "underline",
  },
});

export default Indicadores;
