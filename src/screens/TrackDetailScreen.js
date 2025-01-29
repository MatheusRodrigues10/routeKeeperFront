import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = ({ route }) => {
    const { track } = route.params; // Recebe o objeto
    const initialCoords = track.locations[0].coords; // Usa as coordenadas iniciais do track

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{track.name}</Text>

            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        longitudeDelta: 0.02,
                        latitudeDelta: 0.02,
                        ...initialCoords
                    }}
                >
                    <Polyline coordinates={track.locations.map(loc => loc.coords)} />
                </MapView>
            </View>

            <Text style={styles.infoText}>
                Caso a rota não apareça, aguarde alguns segundos e tente novamente.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        paddingTop: 15,
        textAlign: 'center',
        fontSize: 25
    },
    mapContainer: {
        height: 300,
        margin: 15,
        borderRadius: 25,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
    infoText: {
        color: 'blue', 
        textAlign: 'center',
        fontSize: 14,
        marginTop: 10
    },
});

export default TrackDetailScreen;
