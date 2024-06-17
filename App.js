import {useCallback, useState} from "react"
import { StyleSheet, View } from 'react-native';
import Home from './src/screens/Home';
import Header from "./src/components/Header.jsx";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import ItemListCategory from "./src/screens/ItemListCategory.jsx";

export default function App() {

  // Configurar fuente
  const [fontsLoaded, fontError] = useFonts({
    "Kanit-regular": require("./assets/Kanit/Kanit-Regular.ttf"),
    "Bebas-regular": require("./assets/Bebas_Neue/BebasNeue-Regular.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const [ categorySelected, setCategorySelected] = useState("")


  return (
    <View style={styles.container}>
      <Header title="CATEGORÍAS" />

      {/* Mostrar Home o categorya seleccionada. Operador ternario */}
      {!categorySelected ? (
        <Home setCategorySelected={setCategorySelected} />
      ) : (
        <ItemListCategory
          setCategorySelected={setCategorySelected}
          categorySelected={categorySelected}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
});
