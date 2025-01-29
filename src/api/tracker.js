import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//adicionamos a uma const para rodar um código extra antes de fazer a requisição
const instance = axios.create({
    baseURL: 'https://routekeeperserver.onrender.com',
});

instance.interceptors.request.use(
    //roda automaticamente sempre que vamos fazer uma requisição
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            //adicionando a autorização ao Header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    //se tiver um erro fazendo a requisição ele executa essa
    (err) => {
        //retorna uma promise que por padrão é rejeitada junto com o erro.
        return Promise.reject(err);
    }
);

export default instance;