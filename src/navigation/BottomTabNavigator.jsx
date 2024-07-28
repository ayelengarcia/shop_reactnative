import { colors } from '../global/colors.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';

import HomeStackNavigator from "./HomeStackNavigatior.jsx"
import CartStackNavigator from './CartStackNavigator.jsx'
import OrderStackNavigator from './OrderStackNavigator.jsx'

import Header from "../components/Header.jsx"
import MyProfileStackNavigator from './MyProfileStackNavigator.jsx';


const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        header: () => <Header navigation={navigation} title={route.name} />,
        tabBarShowLabel: false,
      })}
    >

      <Tab.Screen
        name="INICIO"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name="storefront" size={focused ? 32 : 26} color={focused ? colors.blue : colors.ligthBlue} />
            )
          }
        }}
      />
      
      <Tab.Screen
        name="CARRITO"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name="cart" size={focused ? 36 : 30} color={focused ? colors.blue : colors.ligthBlue} />
            )
          }
        }}
      />
      
      <Tab.Screen
        name="ORDENES"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name="receipt" size={focused ? 32 : 26} color={focused ? colors.blue : colors.ligthBlue} />
            )
          }
        }}
      />

      <Tab.Screen
        name="PERFIL"
        component={MyProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name="person-sharp" size={focused ? 32 : 26} color={focused ? colors.blue : colors.ligthBlue} />
            )
          }
        }}
      />

    </Tab.Navigator>
  )
}

export default BottomTabNavigator
