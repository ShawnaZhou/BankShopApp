import {
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  StatusBar,
} from "react-native";
import 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Stacks from "./navigation/Stacks";

export default function App() {
  const isDarkMode = useColorScheme();
  const theme = {
    ...DefaultTheme,
    dark: isDarkMode === "dark" ? true : false,
    roundness: 2,
    mode: "adaptive",
    colors: {
      ...DefaultTheme.colors,
      primary: "#3498db",
      accent: "#f1c40f",
    },
  };
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StatusBar barStyle={"dark-content"} />
        <Stacks />
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

