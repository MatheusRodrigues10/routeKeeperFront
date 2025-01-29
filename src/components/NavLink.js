import React, { useContext } from 'react';
import { Text } from 'react-native-elements';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { useNavigation } from '@react-navigation/native';
import { Context as AuthContext } from '../context/AuthContext';

const NavLink = ({ text, routeName, action }) => {
    const { state } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={() => {
                if (state.errorMessage) action();
                navigation.navigate(routeName)
            }} 
        >
            <Spacer>
                <Text style={styles.registerText}>{text}</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    registerText: {
        color: 'blue'    
    }
});

export default NavLink;

