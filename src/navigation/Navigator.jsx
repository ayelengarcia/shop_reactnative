import { NavigationContainer } from '@react-navigation/native'
// import HomeStackNavigator from "./HomeStackNavigatior"
import BottomTabNavigator from './BottomTabNavigator.jsx'

const Navigator = () => {
  return (
    <NavigationContainer >
      {/* <HomeStackNavigator /> */}
      <BottomTabNavigator />
    </NavigationContainer>
  )
}

export default Navigator