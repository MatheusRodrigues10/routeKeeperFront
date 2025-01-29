//unica coisa que esse component faz é aplicar margem para um component filho.
import React from "react";
import { View, StyleSheet } from 'react-native';

const Spacer = ({ children }) => {
    return <View style={styles.spacer}>{children}</View>
};

const styles = StyleSheet.create({
    spacer: {
        margin: 15
    }
});

export default Spacer;