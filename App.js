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
import Menu from "./components/Menu";

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Noticias"
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
