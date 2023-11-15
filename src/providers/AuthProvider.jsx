import React, { useReducer } from 'react'
import { AuthContext } from '../context/AuthContext' 
import { AuthReducer } from '../reducers/AuthReducer'
import { eShopApiUrl } from '../config/eShopApi'
import AsyncStorage from '@react-native-async-storage/async-storage'


const initState = {
    user: null,
    isLogged: false,
    isLoading: true,
    errorMsg: ''
}


const AuthProvider = ({children}) => {

    const [state, dispatch] = useReducer(AuthReducer, initState);
   

    const login = async(email, password) => {
       try {
         const user = await eShopApiUrl.post('/login', {
             email,
             password
         });
         await AsyncStorage.setItem('token', user.data.token);
         dispatch({
             type: 'LOGIN',
             payload:{
                 user: user.data
             }
         })
       } catch (error) {
        dispatch({
            type: 'ERROR',
            payload: {
                errorMsg: error.response.data
            }
        })
       }
    }

    const checkToken = async() => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
               dispatch({
                type: 'LOGOUT'
               }) 
            }

            const { data } = await eShopApiUrl.get('/review/token');

            dispatch({
                type: 'LOGIN',
                payload: {
                    user: data.res
                }
            })

        } catch (error) {
            dispatch({
                type: 'LOGOUT',
            })
        }
    }


  return (
    <AuthContext.Provider
        value={{
            state,
            login,
            checkToken
        }}
    >
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider