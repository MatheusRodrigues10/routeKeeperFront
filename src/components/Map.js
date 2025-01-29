import React, { useContext } from "react";
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {
    const { state: { currentLocation, locations } } = useContext(LocationContext);

    if (!currentLocation) {
        return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    // Localização inicial do usuário
                    ...currentLocation.coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Circle
                    // A latitude e longitude onde desenhamos o círculo
                    center={currentLocation.coords}
                    radius={25}
                    strokeColor="rgba(158, 158, 255, 1.0)"
                    fillColor="rgba(157, 157, 254, 0.3)"
                />
                <Polyline
                    coordinates={locations.map((loc) => loc.coords)}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 300,
        margin: 15,
        borderRadius: 25, 
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
});

export default Map;
