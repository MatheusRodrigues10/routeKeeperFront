import React, { useContext, useCallback } from "react";
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Text } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Context as LocationContext } from '../context/LocationContext'; 

import Map from "../components/Map";
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = () => {
    const { state: { recording } , addLocation } = useContext(LocationContext);
    const isFocused = useIsFocused();
    
    //adiciona a localização atual ao contexto (ele usa como localização atual) e ele verifica se está gravando a localização ou não
    const callback = useCallback(location => {
        addLocation(location, recording);
    }, [recording]);
    
    /* isFocused = true || false ou se estiver gravando ele não para ao sair da tela,
    essencialmente ele apenas usa o isFocused so para pegar a localização inicial.*/
    const [error] = useLocation(isFocused || recording, callback);

    return (
        <SafeAreaView style={styles.container}>
            <Map />
            {error ? <Text style={styles.errorMessage}>Ligue os serviços de localização</Text> : null}
            <TrackForm />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        fontSize: 25
    }
});

export default TrackCreateScreen;