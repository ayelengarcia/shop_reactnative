import { StyleSheet, StatusBar, Platform, View} from 'react-native';
import { useFonts } from "expo-font";
import Navigator from "./src/navigation/Navigator.jsx"

import { Provider } from 'react-redux';
import store from "./src/store/index.js"

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    "Kanit-regular": require("./assets/Kanit/Kanit-Regular.ttf"),
    "Bebas-regular": require("./assets/Bebas_Neue/BebasNeue-Regular.ttf"),
  }); // Configuracion fuentes

  if (!fontsLoaded && !fontError) return null

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
    backgroundColor: "white"
  },
});