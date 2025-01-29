import React, { useContext } from "react";
import { StyleSheet, View } from 'react-native';
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DemoContext  } from "../context/DemoContext";
import Spacer from "../components/Spacer";

const AccountScreen = () => {
    const { state: { demoMode }, signout } = useContext(AuthContext);
    const { clearData } = useContext(DemoContext)

    return (
        <SafeAreaView style={styles.container}>
            <Spacer>
                {demoMode ? 
                    <View>
                        <Text style={styles.title}>AVISO:</Text>
                        <Text style={styles.text}>Ao sair do modo demonstração, suas rotas serão perdidas. Considere criar uma conta para salvar e acessar suas rotas em qualquer momento.</Text>
                    </View> 
                : null
                }
                <Button 
                    title="Sair" 
                    onPress={() => { 
                        clearData();
                        signout(); 
                    }} 
                />
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#FF0000'
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        padding: 10,
        color: '#D40000'
    }
});

export default AccountScreen;
