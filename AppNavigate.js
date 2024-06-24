import { StyleSheet, StatusBar, Platform } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import Header from "./src/components/Header.jsx"
import Home from './src/screens/Home.jsx';
import ItemListCategory from "./src/screens/ItemListCategory.jsx";
import ItemDetail from "./src/screens/ItemDetail.jsx";

const Stack = createNativeStackNavigator();


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Kanit-regular": require("./assets/Kanit/Kanit-Regular.ttf"),
    "Bebas-regular": require("./assets/Bebas_Neue/BebasNeue-Regular.ttf"),
  }); // Configuracion fuentes

  if (!fontsLoaded && !fontError) return null

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          header: () => {
            return (
              <Header
                title={
                  route.name === "Home"
                    ? "Categories"
                    : route.name === "ItemListCategory"
                    ? route.params.category
                    : "Detail"
                }
              />
            );
          },
        })}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ItemListCategory" component={ItemListCategory} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
});



// // import { useState } from "react"
// import { StyleSheet, View, StatusBar, Platform } from 'react-native';


// import Home from './src/screens/Home.jsx';
// // import Header from "./src/components/Header.jsx";

// // import * as SplashScreen from "expo-splash-screen";
// import { useFonts } from "expo-font";
// import ItemListCategory from "./src/screens/ItemListCategory.jsx";
// import ItemDetail from "./src/screens/ItemDetail.jsx";



// export default function App() {

//   // const [categorySelected, setCategorySelected] = useState("");
//   // const [ItemIdSelected, setItemIdSelected] = useState("");

//   // Configurar fuente
//   const [fontsLoaded, fontError] = useFonts({
//     "Kanit-regular": require("./assets/Kanit/Kanit-Regular.ttf"),
//     "Bebas-regular": require("./assets/Bebas_Neue/BebasNeue-Regular.ttf")
//   });

//   if (!fontsLoaded && !fontError) {
//     return null;
//   }

//   // const onLayoutRootView = useCallback(async () => {
//   //   if (fontsLoaded || fontError) {
//   //     await SplashScreen.hideAsync();
//   //   }
//   // }, [fontsLoaded, fontError]);

//   return (
//     <View style={styles.container}>
//       {/* <Header title="CATEGORÍAS" /> */}

//       {/* Mostrar Home o categorya seleccionada. Operador ternario */}
//       {/* {!categorySelected ? (
//         <Home setCategorySelected={setCategorySelected} />
//       ) : !ItemIdSelected ? (
//         <ItemListCategory
//           setCategorySelected={setCategorySelected}
//           categorySelected={categorySelected}
//           setItemIdSelected={setItemIdSelected}
//         />
//       ) : (
//         <ItemDetail
//           idSelected={ItemIdSelected}
//           setProductSelected={setItemIdSelected}
//         />
//       )} */}

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     height: "100%",
//     width: "100%"
//   },
// });

