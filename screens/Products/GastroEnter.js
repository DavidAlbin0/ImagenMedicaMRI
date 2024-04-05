import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const GastroEnter = () => {
  return (
    <SafeAreaView style={styles.containerflex}>
      <ScrollView>
        
      <SafeAreaView  style={styles.derechaflex}>
        <View>
        <Image source={require('../../assets/logos/logoph.png')} style={styles.imagen}/>
      <SafeAreaView>
          <Text style={styles.titulo}>Endoscopia.</Text>
          <Text style={styles.subtitulo2}>¿Qué es?</Text>
      </SafeAreaView>
             <Text style={styles.textonormal3}>
             La endoscopía es un estudio que permite ver el interior del cuerpo a 
             través de una pequeña cámara unida a un tubo largo y delgado, el cual 
             nos permite visualizar directamente los órganos e identificar lesiones 
             del tubo digestivo, vías biliares, vías urinarias, cavidad abdominal y 
             pélvica, entre otras.
             </Text>
             <Text style={styles.textonormal3}>
             Es una alternativa para el tratamiento de algunos problemas que anteriormente 
             sólo se podían tratar con cirugía. Algunas enfermedades diagnosticables son:     
             </Text>
             <Text style={styles.textonormal3}>
             .- Gastritis y úlceras gástricas.
             </Text>
             <Text style={styles.textonormal3}>
             .- Hernia hiatal.
             </Text>
             <Text style={styles.textonormal3}>
             .- Enfermedades por reflujo.
             </Text>
             <Text style={styles.textonormal3}>
             .- Enfermedades de esófago (esofagitis, barret, acalasia, entre otras).
             </Text>
             <Text style={styles.textonormal3}>
             .- Tumores, colitis, divertículos y hemorroides.
             </Text>
             <Text style={styles.textonormal3}>
             .- Sangrados de tubo digestivo alto y bajo.
             </Text>
             
             <Text style={styles.titulo}>Preparaciones</Text>
             <Text style={styles.subtitulo2}>General.</Text>

             <Text style={styles.textonormal3}>
             .- Traer estudios previos.
             </Text>
             <Text style={styles.textonormal3}>
             .- Se requiere que el paciente se presente en ayuno.
             </Text>
             <Text style={styles.textonormal}>
             * Para estudios especiales favor de llamar a la sucursal en la que se realizará el estudio.
             </Text>
             
        </View>
      </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  )
}



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
    marginStart: 218,
    marginVertical: 0,
  },
  container: {
    backgroundColor: '#63addc',
    height: 215,
    alignContent: 'space-around',
  },

  titulo: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 21,
    color: '#000000',
    fontWeight: '800',
    marginTop: 15,
    marginHorizontal: 30,
    marginStart: 12,
  },

  subtitulo1: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 25,
    color: '#000000',
    fontWeight: '900',
    marginTop: -25,
    marginStart: 25,
  },

  subtitulo2: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 18,
    color: '#000000',
    fontWeight: '700',
    marginTop: 20,
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
    marginEnd: 75,
    marginBottom: 65,
  },

  textonormal2: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginTop: 35,
    marginHorizontal: 30,
    marginEnd: 75,
    marginBottom: 5,
  },

  textonormal3: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginTop: 35,
    marginHorizontal: 30,
    marginEnd: 75,
    marginBottom: 10,
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
  
  containerflex: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    //backgroundColor: 'yellow',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },

  derechaflex: {
    justifyContent: 'flex-start',
    flex: 1,
    //backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 15,
    marginStart:40
  },

  izquierdaflex: {
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center'
  },

  imagen: {
    height: 60,
    width: 120,
    marginTop: 45,
  },


});

export default GastroEnter