import React, {Fragment} from 'react';
import {Image, SafeAreaView, ScrollView, StatusBar, StyleSheet,Text, useColorScheme, View, ActivityIndicator } from 'react-native';
import { useQuery, gql, useApolloClient } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64'; // Importar la biblioteca base-64
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const OBTENER_INFO_POR_CURP = gql`
  query ObtenerInfoPorCurp($curp: String!) {
    obtenerInfoPorCurp(curp: $curp) {
      idPaciente
      nombre_pac
      apat_Pac
      amat_Pac
      fecnac_Pac
      edad_Pac
      sexo_Pac
      tel_Pac
      calle_Pac
      ciudad_Pac
      edo_Pac
      correo_Pac
      colonia
      cp
      correo_pac2
      autoriza1
      autoriza2
      curp
      entidad_nacimiento
    }
  }
`;

const DatosPer = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(null);
  const [curp, setCurp] = useState(null);
  const [loading, setLoading] = useState(true);

  const { loading: queryLoading, error, data } = useQuery(OBTENER_INFO_POR_CURP, {
    variables: { curp },
    skip: !curp,
  });

  useEffect(() => {
    const getTokenAndDecode = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        console.log('Token almacenado:', storedToken);
        setToken(storedToken);

        // Decodificar el token para obtener el CURP
        const decodedToken = JSON.parse(base64.decode(storedToken.split('.')[1]));
        const curpFromToken = decodedToken.curp;
        setCurp(curpFromToken);

        console.log('CURP extraído del token:', curpFromToken);
      } catch (error) {
        console.error('Error al obtener y decodificar el token:', error);
      }
    };

    getTokenAndDecode();
  }, [client]);

  useEffect(() => {
    if (!queryLoading) {
      // Verifica si hay un error en la consulta y maneja en consecuencia
      if (error) {
        console.error('Error en la consulta:', error);
        // Puedes manejar el error de alguna manera específica aquí
      } else if (data) {
        // Asigna los datos obtenidos a los estados necesarios
        // Puedes ajustar esto según tus necesidades
        // Por ejemplo, setArchivos(data.obtenerInfoPorCurp.archivos);
        setLoading(false);
      }
    }
  }, [queryLoading, error, data]);

  if (loading) return <ActivityIndicator />;
  // Si hay un error en la consulta, puedes renderizar un componente de error
  if (error) return <Text>Errorrrrs: {error.message}</Text>;

  // Puedes seguir usando paciente como lo hacías antes
  const paciente = data ? data.obtenerInfoPorCurp : null;

  // ... (resto del componente)

  return (
    <SafeAreaView style={styles.background}>
      <SafeAreaView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titulo}>Datos de {paciente.nombre_pac} </Text>
          <Text style={styles.subtitulo1}>ID: {paciente.idPaciente}</Text>
        </SafeAreaView>
        <SafeAreaView>          
          <Text style={styles.textonormal}>CURP: {paciente.curp}</Text>
          <Text  style={styles.textonormal}>Nombre: {paciente.nombre_pac + " " + paciente.apat_Pac + paciente.amat_Pac}</Text>
          <Text  style={styles.textonormal}>Fecha de Nacimiento: {paciente.fecnac_Pac}</Text>
          <Text  style={styles.textonormal}>Edad: {paciente.edad_Pac}</Text>
          <Text  style={styles.textonormal}>Sexo Biologico : {paciente.sexo_Pac}</Text>
          <Text  style={styles.textonormal}>Telefono: {paciente.tel_Pac}</Text>
          <Text  style={styles.textonormal}>Calle: {paciente.calle_Pac}</Text>
          <Text  style={styles.textonormal}>Ciudad: {paciente.ciudad_Pac}</Text>
          <Text  style={styles.textonormal}>Estado: {paciente.edo_Pac}</Text>
          <Text  style={styles.textonormal}>Colonia: {paciente.colonia}</Text>
          <Text  style={styles.textonormal}>CP: {paciente.cp}</Text>
          </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>

  );
};


/*Aqui empiezan los estilos perrones*/
const styles = StyleSheet.create({
  background: {
    alignContent: 'space-around',
    backgroundColor: '#ffffff',
    width: "100%",
    height: "100%",
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
  container: {
    backgroundColor: '#000066',
    height: 90,
    alignContent: 'space-around',
    marginBottom: 30,
  },

  titulo: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 21,
    color: '#ffffff',
    fontWeight: '900',
    marginTop: 15,
    marginHorizontal: 30,
    marginStart: 12,
  },

  subtitulo1: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 21,
    color: '#ffffff',
    fontWeight: '500',
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
    fontSize: 17,
    color: '#000000',
    marginTop: 12,
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
  }

});


export default DatosPer;
