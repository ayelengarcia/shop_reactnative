import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Order from '../screens/Order'

const Stack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Order"
      screenOptions={{ headerShown: false }}
    >

      <Stack.Screen name="OrderScreen" component={Order} />
      
    </Stack.Navigator>
  )
}

export default OrderStackNavigator
