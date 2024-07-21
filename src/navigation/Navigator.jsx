import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator.jsx'
import AuthStackNavigator from './AuthStackNavigator.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from '../features/user/UserSlice.js';
import { useDB } from '../persistence/useDB'


const Navigator = () => {

  const { user } = useSelector((state) => state.auth.value)
  const dispatch = useDispatch()
  const { getSession } = useDB()

  useEffect(() => {
    (async () => {
      try {
        const response = await getSession();
        if (response) {
          const user = response;
          dispatch(
            setUser({
              email: user.email,
              localId: user.localId,
              idToken: user.token,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  });

  return (
    <NavigationContainer >
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default Navigator