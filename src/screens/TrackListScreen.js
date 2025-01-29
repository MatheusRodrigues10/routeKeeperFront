import React, { useContext, useEffect } from "react";
import { View, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/core";
import { Context as TrackContext } from '../context/TrackContext';
import { Context as DemoContext } from "../context/DemoContext";
import { Context as AuthContext } from "../context/AuthContext";

const TrackListScreen = () => {
    const { state: cloudState, fetchTracks: fetchCloud } = useContext(TrackContext);
    const { state: demoState, fetchTracks: fetchDemo } = useContext(DemoContext);
    const { state: { demoMode } } = useContext(AuthContext);

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    
    //Executa a busca ao entrar na tela seja do demo ou do cloud 
    useEffect(() => {
        if (isFocused && !demoMode) {
            fetchCloud();
        } else if (isFocused && demoMode) {
            fetchDemo();
        }
    }, [isFocused]);

    //renderizar cada item da lista
    const renderItem = ({ item }) => (
        <List.Item
            title={item.name}
            onPress={() => navigation.navigate('TrackDetail', { track: item })}
            right={() => <List.Icon icon="chevron-right" />}
        />
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                //se estiver no modo demo reenderiza o estado do demo caso contrario o da nuvem.
                data={demoMode ? demoState : cloudState}
                keyExtractor={item => item._id}
                renderItem={renderItem}
            />
        </View>
    );
};

export default TrackListScreen;
