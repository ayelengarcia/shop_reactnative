import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from '../screens/Home.jsx';
import ItemListCategory from "../screens/ItemListCategory.jsx";
import ItemDetail from "../screens/ItemDetail.jsx";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
        
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ItemListCategory" component={ItemListCategory} />
      <Stack.Screen name="ItemDetail" component={ItemDetail}/>
      
      </Stack.Navigator>
  );
}
