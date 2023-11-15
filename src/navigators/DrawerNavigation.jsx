import React, { useContext, useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';
import TabsNavigator from './TabsNavigator';
import LoginScreen from '../Components/auth/LoginScreen'


const Drawer = createDrawerNavigator();

const { state, checkToken } = useContext(AuthContext);

useEffect(() => {
    checkToken()
  }, [])
  

const DrawerNavigation = () => {

    if (state.isLogged) {
        return (
         <Drawer.Navigator>
            <Drawer.Screen name='Casita' options={{title: 'Casa'}} component={TabsNavigator}/>
         </Drawer.Navigator> 
        )        
    };

    if (!state.isLogged) {
        return (
         <Drawer.Navigator>
            <Drawer.Screen name='Entrar' options={{title: 'Log'}} component={LoginScreen}/>
         </Drawer.Navigator> 
        )        
    }


}

export default DrawerNavigation