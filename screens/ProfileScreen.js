import React, {Fragment, useState, useEffect} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Linking, TouchableOpacity, Button,
} from 'react-native';
import { useForceUpdate } from '../Components/useForceUpdate'; // Ajusta la ruta según tu estructura de carpetas

const ProfileScreen = () => {
  const navigation = useNavigation();
  const forceUpdate = useForceUpdate(); // Llama al hook directamente en el cuerpo del componente
  const [token, setToken] = useState(null); // Estado para almacenar el token
  const [checkedToken, setCheckedToken] = useState(false); // Nuevo estado para controlar si ya comprobaste el token

  // Función para obtener el token
  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
      console.log('Token almacenado:', storedToken);
    } catch (error) {
      console.log('Error al obtener el token:', error);
      forceUpdate(); // Forzamos la actualización al obtener el token
    }
  };

  // Efecto que se ejecuta al montar la pantalla y cada vez que entra en foco
  useFocusEffect(() => {
    // Comprobamos el token solo si no lo hemos comprobado antes
    if (!checkedToken) {
      getToken();
    }
  });

  // Función para cerrar sesión
    const cerrarSesion = async () => {
      try {
        await AsyncStorage.removeItem('token'); // Eliminar el token del AsyncStorage
        setToken(null); // Limpiar el token del estado
        console.log('Sesión cerrada');
      } catch (error) {
        console.log('Error al cerrar sesión:', error);
      }
    };

    const handleWhatsApp = () => {
      const phoneNumber = '+52 1 777 362 0260'; // Reemplaza esto con el número de WhatsApp al que deseas enviar el mensaje
      const message = '¡Hola! Estoy utilizando tu Aplicacion Movil y quiero cotizar un servicio'; // Mensaje automático
      const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      Linking.openURL(url)
        .then((data) => {
          console.log('WhatsApp abierto:', data);
        })
        .catch((error) => {
          console.log('Error al abrir WhatsApp:', error);
        });
      };

      return (
        <SafeAreaView>
          <ScrollView>
            {token ? ( // Si hay un token válido
              <Fragment>
                {/*Recuadro Azul*/}
                <SafeAreaView style={styles.container}>
                  <Text style={styles.subtitulo2}>¡Hola!</Text>
                  <SafeAreaView style={styles.background}>
                    <Image
                      source={require('../assets/logos/logoph.png')}
                      style={styles.imglogo}
                    />
                    <Text style={styles.subtitulo1}>Bienvenido</Text>
                  </SafeAreaView>
                </SafeAreaView>
    
                {/* Pestanas de busqueda de pacientes*/}
    
                <SafeAreaView style={styles.backinfo}>
                  <SafeAreaView>
                    <Text
                      style={styles.textonormal}
                      onPress={() => navigation.navigate('HistorialStudio')}>
                      Historial de estudios
                    </Text>
                  </SafeAreaView>
                  <Text style={styles.textonormal}>Notificaciones</Text>
    
                  <Text style={styles.textonormal}>Promociones y descuentos</Text>
    
                  <Text
                    style={styles.textonormal}
                    onPress={() => navigation.navigate('Datos Personales')}>
                    Datos de la Cuenta
                  </Text>
    
                  {/* Espacios en blanco */}
    
                  <Text style={styles.textonormal}>{''}</Text>
    
                  <Text style={styles.textonormal}>{''}</Text>
    
                  {/*Ayuda and stuff*/}
                 
                  <Text style={styles.textochico}>Acerca de</Text>
                  <Text style={styles.textochico}>Politicas</Text>

                  <TouchableOpacity onPress={handleWhatsApp}>
                    
                   

              <Text style={styles.textochicofon} onPress={handleWhatsApp}>¿Necesitas Cotizar?</Text>
                  </TouchableOpacity>
                  <Image source={require("../assets/iconos/Teléfono.png")}
                  
                  style={styles.imagen}/>
                </SafeAreaView>
              </Fragment>
            ) : ( // Si no hay un token válido
              <View style={styles.container2}>
                <Text style={styles.tituloDeneg}>Parece que aún no has iniciado sesión. Inicia sesión aquí. ⬇️ </Text>
                <Button
                  title="Iniciar Sesión"
                  color="#000066"
                  style={styles.button}
                  onPress={() => navigation.navigate('Configuracion')}
                />
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      );
    };

/*Aqui empiezan los estilos perrones*/
const styles = StyleSheet.create({
  background: {
    alignContent: 'space-around',
  },

  containeropt: {
    alignContent: 'flex-start',
  },

  imglogo: {
    width: 170,
    height: 85,
    marginStart: 200,
    marginVertical: 0,
   
  },

  button: {
    height: 30,
    margin: 22,
    backgroundColor: '#FFFFFF',
  },

  container: {
    backgroundColor: '#000066',
    height: 215,
    alignContent: 'space-around',
  },

  container2: {
    backgroundColor: '#000066',
    height: 250,
    alignContent: 'space-around',
  },

  titulo: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 21,
    color: '#ffffff',
    fontWeight: '800',
    marginTop: 15,
    marginHorizontal: 30,
    marginStart: 12,
  },
  
  tituloDeneg: {
    textTransform: 'uppercase',
    fontSize: 21,
    color: '#ffffff',
    fontWeight: '800',
    marginTop: 90,
    marginHorizontal: 30,
    marginStart: 52,
    marginBottom: 30,
  },

  subtitulo1: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 25,
    color: '#ffffff',
    fontWeight: '900',
    marginTop: -25,
    marginStart: 25,
  },

  subtitulo2: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '700',
    marginTop: 60,
    marginHorizontal: 30,
    marginStart: 25,
  },

  textonormal: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginTop: 35,
    marginHorizontal: 30,
    marginStart: 35, 
  },

  textochico: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
    marginTop: 35,
    marginHorizontal: 30,
    marginStart: 25,
  },


  backinfo: {
    backgroundColor: '#ffffff',
    height: 650,
  },
  
  textochicofon: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
    marginTop: 35,
    marginHorizontal: 30,
    marginStart: 25,
  },

  imagen: {
    width: 75,
    height: 75,
    marginStart: 300,
}

});

export default ProfileScreen;
