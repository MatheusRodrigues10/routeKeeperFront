import React, { useContext } from "react";
import { View, StyleSheet } from 'react-native';
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import DemoMode from "../components/DemoMode";

const SigninScreen = () => {
    const { state, signin, demoMode, clearErrorMessage } = useContext(AuthContext);
    
    return (
        <View style={styles.container}>
            <AuthForm
                headerText="Logue ao RouteKeeper"
                errorMessage={state.errorMessage}
                onSubmit={signin}
                submitButtonText="Login"
            />
            <NavLink
                text="Ainda não tem uma conta? clique aqui e registre-se"
                routeName="Signup"
                action={clearErrorMessage}
            />
            <DemoMode 
                action={demoMode}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    },
});

export default SigninScreen;