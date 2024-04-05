import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabBar, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import Settings from './screens/Settings';
import {createStackNavigator} from '@react-navigation/stack';
import Prueba from './screens/Prueba';
import HistorialStudio from './screens/HistorialStudio';
import DatosPer from './screens/DatosPer';
import { Login } from './screens/Login';
import CrearCuenta from './screens/CrearCuenta';
import { ApolloClient, useQuery, gql } from '@apollo/client';
import { ApolloProvider, InMemoryCache } from '@apollo/client';
import Notificaciones from './screens/Notificaciones'
import client from './config/apollo'
import { Notifications } from 'expo';
//import * as Permissions from 'expo-permissions';
import AnalisisClinicos from './screens/Products/AnalisisClinicos';
import Cardiologia from './screens/Products/Cardiologia';
import Colonscopia from './screens/Products/Colposcopia';
import Densitometria from './screens/Products/Densitometria';
import GastroEnter from './screens/Products/GastroEnter';
import Mastogra from './screens/Products/Mastogra';
import Neurofisiologia from './screens/Products/Neurofisiologia';
import RayosX from './screens/Products/RayosX';
import RayosxContrastados from './screens/Products/RayosxContrastados';
import ResonanciaMagnetica from './screens/Products/ResonanciaMagnetica';
import TomogrMultic from './screens/Products/TomogrMultic';
import UltrasonConDop from './screens/Products/UltrasonConDop';
import { Ionicons } from '@expo/vector-icons';  // Importa el conjunto de iconos que desees utilizar

/*
const getToken = async () => {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }


  const token = await Notifications.getExpoPushTokenAsync();
  console.log('wacha tu tokenpa:', token);

}
*/

const HomeStackNavigator = createStackNavigator(); 

function MyStack() {
  return (
  <ApolloProvider client={client}>
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen 
        initialRouteName="HomeScreen"
        name="InicioScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: null, // Agrega esta línea para ocultar el título en la barra superior

        }}
      />

      <HomeStackNavigator.Screen 
        initialRouteName="ProfileScreen"
        name="HistorialStudio"
        component={HistorialStudio}
        options={{
          headerBackTitleVisible: false,
        }}
      />


      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="AnalisisClinicos"
        component={AnalisisClinicos}
        options={{
          headerShown: false,
        }}
      />

      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="Cardiologia"
        component={Cardiologia}
        options={{
          headerShown: false,
        }}
      />

      
      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="Colposcopia"
        component={Colonscopia}
        options={{
          headerShown: false,
        }}
      />

      
      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="Densitometria"
        component={Densitometria}
        options={{
          headerShown: false,
        }}
      />

      
      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="GastroEnter"
        component={GastroEnter}
        options={{
          headerShown: false,
        }}
      />

      
      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="Mastogra"
        component={Mastogra}
        options={{
          headerShown: false,
        }}
      />

      
      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="Neurofisiologia"
        component={Neurofisiologia}
        options={{
          headerShown: false,
        }}
      />

      
      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="RayosX"
        component={RayosX}
        options={{
          headerShown: false,
        }}
      />

      
      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="RayosxContrastados"
        component={RayosxContrastados}
        options={{
          headerShown: false,
        }}
      />

      
      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="ResonanciaMagnetica"
        component={ResonanciaMagnetica}
        options={{
          headerShown: false,
        }}
      />

      
      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="TomogrMultic"
        component={TomogrMultic}
        options={{
          headerShown: false,
        }}
      />

      
      <HomeStackNavigator.Screen
        initialRouteName="HomeScreen"
        name="UltrasonConDop"
        component={UltrasonConDop}
        options={{
          headerShown: false,
        }}
      />

      <HomeStackNavigator.Screen
        initialRouteName="ProfileScreen"
        name="CrearCuenta"
        component={CrearCuenta}
        options={{
          headerShown: false,
        }}
      />

      <HomeStackNavigator.Screen
        name="Datos Personales"
        component={DatosPer}
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </HomeStackNavigator.Navigator>
  </ApolloProvider>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Inicio"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Inicio') {
                iconName = 'home';  
              } else if (route.name === 'Perfil') {
                iconName = 'person-sharp';
              } else if (route.name === 'Prueba') {
                iconName = 'settings';
              } else if (route.name === 'Configuracion') {
                iconName = 'settings';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
          })}
          tabBarOptions={{
            inactiveTintColor: '#ffffff',
            activeTintColor: '#000066',
            activeBackgroundColor: '#E7E7E7',
            inactiveBackgroundColor: '#000066',
            style: {
              display: 'flex',
            },
          }}
        >
          <Tab.Screen name="Inicio" component={MyStack} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
          <Tab.Screen name="Prueba" component={Prueba} />
          <Tab.Screen name="Configuracion" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}


export default App;
