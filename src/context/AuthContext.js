import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker"; 

// Valores padrões da aplicação.
const defaultValues = {
    token: null,
    errorMessage: '',
    isAuthenticated: false,
    isLoading: true,
    demoMode: false
};

// Reducer
const authReducer = (state, action) => {
    switch(action.type) {
        case 'loading':
            return { ...state, isLoading: action.payload };
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return {
                //coloquei demo mode para evitar o usuário de alguma forma autenticar com login e modo demo
                errorMessage: '', 
                token: action.payload.token, 
                isAuthenticated: true, 
                isLoading: false,
                demoMode: false
            };
        case 'add_demo_mode':
            return { ...state, isAuthenticated: false, demoMode: true, token: null }
        case 'signout':
            return { ...defaultValues };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
};

//limpar mensagens de erro
const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};

//Loga se houver token ou se estiver no modo demo automaticamente 
const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    const demo = await AsyncStorage.getItem('demo');
    if (token) {
        dispatch({ type: 'signin', payload: token }); 
    }
    else if (demo === 'true') {
        dispatch({ type: 'add_demo_mode' })
        dispatch({ type: 'loading', payload: false });
    }
    else {
        dispatch({ type: 'loading', payload: false });
    }
};

//modo demostração
const demoMode = dispatch => async () => {
    await AsyncStorage.setItem('demo', 'true');
    dispatch({ type: 'add_demo_mode' });
};

//registrar
const signup = dispatch => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
 
        dispatch({ type: 'signin', payload: { token: response.data.token } });
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Algo deu errado ao tentar se registrar.' });
    }
};

//Login
const signin = dispatch => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        
        dispatch({ type: 'signin', payload: { token: response.data.token } });
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Algo deu errado ao tentar logar.' });
    }
};

//Sair e limpar o token de autenticação
const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('demo');
    dispatch({ type: 'signout' });
};


export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, demoMode, clearErrorMessage, tryLocalSignin },
    defaultValues
);
