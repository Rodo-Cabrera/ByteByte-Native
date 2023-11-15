import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from 'expo-constants'

const urlApi = Constants.expoConfig.extra.port;

export const eShopApiUrl = axios.create({
    baseURL: urlApi,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

eShopApiUrl.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers['access-token'] = token;
        }
        return config;
    }
)

