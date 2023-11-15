import React, { useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../Components/auth/LoginScreen';
import RegisterScreen from '../Components/auth/RegisterScreen';
import TabsNavigator from './TabsNavigator';
import { AuthContext } from '../context/AuthContext';
import ShopScreen from '../Components/products/ShopScreen';
const Stack = createStackNavigator();


const StackAuthNavigator = () => {

  const { state, checkToken } = useContext(AuthContext);

  //mover toda la logica de login para un DraweNavigation!


  if (state.isLogged) {
    return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(255, 204, 0)',
        }
      }}>
          <Stack.Screen
          options={{
            title: 'Landing',
          }} 
          name='Home'
          component={TabsNavigator}
          />
          <Stack.Screen
          options={{
            title: 'Shop',
          }} 
          name='Shop'
          component={ShopScreen}
          />
      </Stack.Navigator>
    )
  };

  if (!state.isLogged) {
    return (
      <Stack.Navigator>
      <Stack.Screen 
      name='Auth' 
      component={LoginScreen}
      options={{title: 'Ingreso'}}
      />
      <Stack.Screen 
      name='Register' 
      component={RegisterScreen}
      options={{title: 'Registro'}}
      />
      </Stack.Navigator>
    )
  }
}

//   return (
//     <Stack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: 'rgb(255, 204, 0)',
//       }
//     }}>
//         <Stack.Screen
//         options={{
//           title: 'Landing',
//         }} 
//         name='Home'
//         component={TabsNavigator}
//         />
//         <Stack.Screen 
//         name='Auth' 
//         component={LoginScreen}
//         options={{title: 'Ingreso'}}
//         />
//         <Stack.Screen 
//         name='Register' 
//         component={RegisterScreen}
//         options={{title: 'Registro'}}
//         />
//     </Stack.Navigator>
//   )
// }

export default StackAuthNavigator