import React from 'react';
import HomeScreen from '../Components/screens/HomeScreen';
import SearchProducts from '../Components/products/SearchProducts';
import ProfileScreen from '../Components/auth/profile/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import TabButton from './TabButton';
import { View } from 'react-native';


const Tab = createBottomTabNavigator()

const Tabs = () => {

    const tabs = [
    {
        id: 1,
        title: 'Inicio',
        screen: 'Home',
        icon: 'home',
        Component: HomeScreen
    },
    {
        id: 2,
        title: 'Buscar',
        screen: 'Shop',
        icon: 'magnify',
        Component: SearchProducts
    },
    {
        id: 3,
        title: 'Perfil',
        screen: 'ProfileScreen',
        icon: 'face-man-profile',
        Component: ProfileScreen
    },
]


  return (
       
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar
            }}
            >
            {
                tabs.map( (item, index, array) =>
                
                
                <Tab.Screen 
                key={item.id}
                name={item.title}
                component={item.Component}
                options={{
                    tabBarShowLabel: false,
                    tabBarButton: (props) => <TabButton item={item} {...props}/>,
                }}
                />                   
                
                )
            }
        </Tab.Navigator>
    
  )
}

export default Tabs

const styles = StyleSheet.create({
    tabBar: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 15,
        marginHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#dadada',
        backgroundColor: 'rgb(255, 204, 0)'
    }
})