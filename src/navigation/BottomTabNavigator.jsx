import { StyleSheet, View } from 'react-native'
import { colors } from '../global/colors.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';

import HomeStackNavigator from "./HomeStackNavigatior.jsx"
import CartStackNavigator from './CartStackNavigator.jsx'
import OrderStackNavigator from './OrderStackNavigator.jsx'

import Header from "../components/Header.jsx"


const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header title={route.name} />
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar
      }
      )}
    >

      <Tab.Screen
        name="Shop"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name="storefront" size={26} color={ focused ? "black" : "white"} />
            )
          }
        }}
      />
      
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name="cart" size={26} color={focused ? "black" : "white"} />
            )
          }
        }}
      />
      
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name="receipt" size={26} color={focused ? "black" : "white"} />
            )
          }
        }}
      />

    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.p_black
  }
})