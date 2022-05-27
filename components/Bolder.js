import Colors from "../utilities/Colors";
import { Text } from "react-native";

const Bolder = ({ children, color = Colors.primary }) => (
  <Text style={{ fontWeight: "bold", color: color }}>{children}</Text>
);

export default Bolder;
