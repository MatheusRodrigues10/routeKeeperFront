import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

//tenta o login ao entrar no app seja pelo modo demo ou com token, ele essencialmente é uma tela em branco.
const LoadingScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);
    
    useEffect(() => {
        tryLocalSignin();
    }, [])
    
    return null;
};

export default LoadingScreen;