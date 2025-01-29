import React from "react";
import { Text } from 'react-native-elements';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Spacer from './Spacer';

const DemoMode = ({ action }) => {

    return (
        <TouchableOpacity 
            onPress={() => { action(); }}
        >
            <Spacer>
                <Text style={styles.demoText}>Clique aqui e experimente a demonstração para explorar as funcionalidades do aplicativo</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    demoText: {
        color: 'green'    
    }
});

export default DemoMode;

