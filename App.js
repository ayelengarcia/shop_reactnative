import { StyleSheet, StatusBar, Platform, View } from 'react-native';
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Provider } from 'react-redux';
import { useDB } from "./src/persistence/useDB";
import Navigator from "./src/navigation/Navigator.jsx";
import store from "./src/store/index.js"
import { colors } from './src/global/colors.js';


export default function App() {

  const { initDB } = useDB();

  useEffect(() => {
    initDB();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    "Kanit-regular": require("./assets/Kanit/Kanit-Regular.ttf"),
    "Bebas-regular": require("./assets/Bebas_Neue/BebasNeue-Regular.ttf"),
  });

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
    backgroundColor: colors.white
  },
});
