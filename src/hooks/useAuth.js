import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getOneUser } from '../config/api';


export const useAuth = () => {

    const {state, login} = useContext(AuthContext);

    const [userId, setUserId] = useState(null);
    const [actualUser, setActualUser] = useState([]);
    const [token, setToken] = useState(null)
    
   

    useEffect(() => {
        if (state.user) {
            try {
                const payload = JSON.parse(state.user.payload);
                setUserId(payload.id);
                setToken(state.user.token)
            } catch (error) {
                console.log(error);
            }
        };
    }, [state]);


    

    const fetchUser = async () => {
        try {
            if (token && userId) {
                const response = await getOneUser(token, userId);
                setActualUser(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser()
    },[token])

    return{
        userId,
        token,
        actualUser
    }

}