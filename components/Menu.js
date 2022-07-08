import { DrawerItem } from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome, Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Colors from "../utilities/Colors";

function Menu(props) {
  const navigation = props.navigation;
  return (
    <View>
      <Text style={styles.titulo}>Mi Ruta</Text>
      <View style={styles.itemsContainer}>
        <DrawerItem
          label="Buscar SKU"
          labelStyle={{ color: Colors.primary }}
          icon={() => (
            <FontAwesome name="search" size={20} color={Colors.primary} />
          )}
          onPress={() => navigation.navigate("BuscadorSku")}
        />
        <DrawerItem
          label="Indicadores"
          labelStyle={{ color: Colors.primary }}
          icon={() => (
            <Foundation name="target" size={22} color={Colors.primary} />
          )}
          onPress={() => navigation.navigate("Indicadores")}
        />
        <DrawerItem
          label="Novedades"
          labelStyle={{ color: Colors.primary }}
          onPress={() => navigation.navigate("Noticias")}
          icon={() => (
            <FontAwesome name="newspaper-o" size={20} color={Colors.primary} />
          )}
        />
        <DrawerItem
          label="Login"
          labelStyle={{ color: Colors.primary }}
          onPress={() => navigation.navigate("Login")}
          icon={() => <Entypo name="login" size={20} color={Colors.primary} />}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    marginTop: 20,
  },
  itemsContainer: {
    marginTop: 16,
  },
});
export default Menu;
