import React, { useContext } from "react";
import { View, StyleSheet} from 'react-native';
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import DemoMode from "../components/DemoMode";

const SignupScreen = () => {
    const { state, signup, demoMode, clearErrorMessage } = useContext(AuthContext);
    
    return (
        <View style={styles.container}>
            <AuthForm
                headerText="Registrar-se ao RouteKeeper"
                errorMessage={state.errorMessage}
                onSubmit={signup}
                submitButtonText="Registrar"
            />
            <NavLink 
                text="Já tem uma conta? clique aqui e faça login"
                routeName="Signin"
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

export default SignupScreen;