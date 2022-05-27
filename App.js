import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./screens/Login";
import Indicadores from "./screens/Indicadores";
import BuscadorSku from "./screens/BuscadorSku";
import NuevoFeedback from "./screens/feedbacks/NuevoFeedback";
import HistorialFeedbacks from "./screens/feedbacks/HistorialFeedbacks";
import Noticias from "./screens/Noticias";
import FeedbackFull from "./screens/feedbacks/FeedbackFull";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import getUser from "./firebase/getUser";
import getDb from "./firebase/getDb";
import Menu from "./components/Menu";
import Colors from "./utilities/Colors";

export default function App() {
  const [userData, setUserData] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [db, app] = getDb();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserData(await getUser(user.email));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="NuevoFeedback"
        drawerContent={(props) => <Menu {...props} />}
      >
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            title: "Mi Ruta",
          }}
        />
        <Drawer.Screen
          name="Noticias"
          component={Noticias}
          options={{ title: "Novedades" }}
        />
        <Drawer.Screen name="Indicadores" component={Indicadores} />
        <Drawer.Screen
          name="BuscadorSku"
          component={BuscadorSku}
          options={{
            title: "Buscar SKU",
          }}
        />
        <Drawer.Screen
          name="NuevoFeedback"
          component={NuevoFeedback}
          options={{ title: "Nuevo Feedback" }}
        />
        <Drawer.Screen
          name="HistorialFeedbacks"
          component={HistorialFeedbacks}
          options={{
            title: "Feedbacks Cargados",
          }}
        />
        <Drawer.Screen
          name="FeedbackFull"
          component={FeedbackFull}
          options={{
            title: "Feedback",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
