import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProfile from '../screens/MyProfile'
import ImageSelector from '../screens/ImageSelector'

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
    </Stack.Navigator>
  )
}

export default MyProfileStackNavigator
