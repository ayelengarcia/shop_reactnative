import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator.jsx'
import AuthStackNavigator from './AuthStackNavigator.jsx';
import { useSelector } from 'react-redux';

const Navigator = () => {

  const { user } = useSelector((state) => state.auth.value)

  return (
    <NavigationContainer >
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default Navigator