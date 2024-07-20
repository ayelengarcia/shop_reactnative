import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProfile from '../screens/MyProfile'
import ImageSelector from '../screens/ImageSelector'
import ListAddress from '../screens/ListAddress'
import LocationSelector from '../screens/LocationSelector'

const Stack = createNativeStackNavigator()

const MyProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='My Profile'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen component={MyProfile} name="My Profile" />
      <Stack.Screen component={ImageSelector} name="Image Selector" />
      <Stack.Screen component={ListAddress} name="List Address" />
      <Stack.Screen component={LocationSelector} name="Location Selector" />
    </Stack.Navigator>
  )
}

export default MyProfileStackNavigator
