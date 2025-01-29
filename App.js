import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from 'react-native-vector-icons';

// Contextos e Providers
import { Context as AuthContext } from "./src/context/AuthContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from './src/context/TrackContext';
import { Provider as DemoProvider } from "./src/context/DemoContext";

// Navegação
import { setNavigator } from "./src/navigatorRef";

// Telas
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import LoadingScreen from "./src/screens/LoadingScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//demoMode serve para mudar o nome na tela de conta.
function MainTabs({ demoMode }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{
          headerTitle: 'Suas Rotas',
          headerTitleAlign: 'center',
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        options={{
          headerTitle: 'Criar nova rota',
          headerTitleAlign: 'center',
          tabBarLabel: 'Nova Rota',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerTitle: demoMode ? 'Modo Demonstração' : 'Sua Conta',
          headerTitleAlign: 'center',
          tabBarLabel: 'Conta',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const { state } = useContext(AuthContext);

  return (
    //criamos um navegador entre todas as telas usando ref.
    <NavigationContainer
      ref={(navigator) => {
        setNavigator(navigator);
      }}
    >
      <Stack.Navigator>
        {/* a tela de loading serve para tentar login (cloud ou demo) e desaparece logo após */}
        {state.isLoading ? (
          <Stack.Screen options={{ headerShown: false }} name="Loading" component={LoadingScreen} />
        ) : 
        /* verifica se está autenticado por login ou demo e mostra as telas, ambos funcionam com mesmo proposito */
        state.isAuthenticated || state.demoMode ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="MainTabs"
            >
              {/* verifica demoMode para mudar título da tela de conta. */}
              {() => <MainTabs demoMode={state.demoMode} />}
            </Stack.Screen>
            <Stack.Screen
              options={{ headerTitle: 'Detalhes da rota' }}
              name="TrackDetail"
              component={TrackDetailScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
            <Stack.Screen name="Signin" options={{ headerShown: false }} component={SigninScreen} />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

//todos os providers estão aninhados aqui
export default () => {
  return (
    <DemoProvider>
      <TrackProvider>
        <LocationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LocationProvider>
      </TrackProvider>
    </DemoProvider>
  )
};

