import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ActivityIndicator, SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import base64 from 'base-64'; // Importar la biblioteca base-64
import * as FileSystem from 'expo-file-system';


const OBTENER_ARCHIVOS_POR_CURP = gql`
  query ObtenerArchivosPorCurp($curp: String!) {
    obtenerArchivosPorCurp(curp: $curp) {
      nombre  
      tipo
      contenido
    }
  }
`;

const HistorialStudio = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [curp, setCurp] = useState(null);
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTokenAndDecode = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        console.log('Token almacenado:', storedToken);
        setToken(storedToken);
  
        // Decodificar el token para obtener el CURP
        const decodedToken = JSON.parse(base64.decode(storedToken.split('.')[1])); // Decodificar el payload del token
        const curpFromToken = decodedToken.curp;
        setCurp(curpFromToken);
  
        console.log('CURP extraído del token:', curpFromToken);
      } catch (error) {
        console.error('Error al obtener y decodificar el token:', error);
      }
    };
  
    getTokenAndDecode();
  }, []);
  
  const { loading: queryLoading, data } = useQuery(OBTENER_ARCHIVOS_POR_CURP, {
    variables: { curp },
    skip: !curp,
  });

  useEffect(() => {
    if (!queryLoading && data) {
      setArchivos(data.obtenerArchivosPorCurp);
      setLoading(false);
    }
  }, [queryLoading, data]);


  const handleDownload = async (archivo) => {
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        archivo.contenido,
        FileSystem.documentDirectory + archivo.nombre
      );

      const { uri } = await downloadResumable.downloadAsync();

      console.log('Archivo descargado:', uri);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };




  return (
    <SafeAreaView >
      {!token ? (
        <View style={styles.container2}>
                <Text style={styles.tituloDeneg}>Parece que aún no has iniciado sesión. Inicia sesión aquí. ⬇️ </Text>
                <Button
                  title="Iniciar Sesión"
                  color="#000066"
                  style={styles.button}
                  onPress={() => navigation.navigate('Configuracion')}
                />
              </View>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={archivos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View>
                  <Text onPress={() => handleDownload}>{`Nombre: ${item.nombre}`}</Text>
                </View>
              )}
            />
          )}
        </>
      )}
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
    marginStart: 125,
    marginVertical: 75,
  },
  container: {
    backgroundColor: '#63addc',
    height: 55,
    alignContent: 'space-around',
    fontSize: 110,
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


  titulo: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 77,
    color: '#ffffff',
    fontWeight: '800',
    
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

  background: {
    backgroundColor: "#ffffff"
  }, 
  container2: {
    backgroundColor: '#000066',
    height: 250,
    alignContent: 'space-around',
  },
});

export default HistorialStudio;
