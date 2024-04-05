import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { gql, useMutation } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-modern-datepicker";
import { useNavigation } from '@react-navigation/native';

const CREAR_USUARIO = gql`
  mutation crearUsuario($input: UsuarioInput) {
    crearUsuario(input: $input) {
      curp
      email
      password
      username
      nombre
      apellidoPaterno
      apellidoMaterno
      fechaNacimiento
      entidadFederativaNacimiento
      sexo
    }
  }
`;

const CrearCuenta = () => {
  const [input, setInput] = useState({
    curp: "",
    email: "",
    password: "",
    username: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    entidadFederativaNacimiento: "",
    sexo: "",
  });

  function handleonPress() {
    setOpen(!open);
  }

  const [mensaje, setMensaje] = useState("");

  const [open, setOpen] = useState(false);
  const navigation = useNavigation();


  const entidadesFederativas = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Estado de México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ];

  const [crearUsuario] = useMutation(CREAR_USUARIO);
  const handleCrearUsuario = async () => {
    try {
      // Asegúrate de que input tenga un valor definido
      const result = await crearUsuario({ variables: { input } });
      console.log("Usuario creado:", result.data.crearUsuario);
      navigation.navigate('Configuracion');

    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
  <SafeAreaView >
  <ScrollView>
  <SafeAreaView style={styles.background}>
    <View style={styles.container}>

    <Image
                                source={require('../assets/logos/logoph.png')}
                                style={styles.imglogo}
                            />
      <TextInput
        style={styles.input}
        placeholder="CURP"
        onChangeText={(value) => setInput({ ...input, curp: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(value) => setInput({ ...input, email: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(value) => setInput({ ...input, username: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(value) => setInput({ ...input, password: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={(value) => setInput({ ...input, nombre: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido Paterno"
        onChangeText={(value) => setInput({ ...input, apellidoPaterno: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido Materno"
        onChangeText={(value) => setInput({ ...input, apellidoMaterno: value })}
      />
      <TouchableOpacity onPress={handleonPress}>
        <Text style={styles.input}>
          {input.fechaNacimiento
            ? input.fechaNacimiento
            : "Fecha de Nacimiento"}
        </Text>
      </TouchableOpacity>
      <Modal visible={open} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.input}>Ingrese su fecha de Nacimiento</Text>

            <DatePicker
              options={{
                backgroundColor: "#090C08",
                textHeaderColor: "#FFA25B",
                textDefaultColor: "#F6E7C1",
                selectedTextColor: "#fff",
                mainColor: "#F4722B",
                textSecondaryColor: "#D6C7A1",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
              current="1940-05-05"
              selected="2020-07-23"
              mode="calendar"
              minuteInterval={30}
              dateFormat="YYYY-MM-DD"
              style={{ borderRadius: 10 }}
              onDateChange={(date) =>
                setInput({ ...input, fechaNacimiento: date })
              }
            />
            <TouchableOpacity onPress={handleonPress}>
              <Text style={styles.input}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Picker
        selectedValue={input.entidadFederativaNacimiento}
        style={[styles.input, styles.picker]}
        onValueChange={(itemValue, itemIndex) =>
          setInput({ ...input, entidadFederativaNacimiento: itemValue })
        }
      >
        <Picker.Item label="Entidad Federativa de nacimiento" value="" />
        {entidadesFederativas.map((entidad, index) => (
          <Picker.Item key={index} label={entidad} value={entidad} />
        ))}
      </Picker>

      <Picker
        selectedValue={input.sexo}
        style={[styles.input, styles.picker]} // Agregar estilos al picker
        onValueChange={(itemValue, itemIndex) =>
          setInput({ ...input, sexo: itemValue })
        }
      >
        <Picker.Item label="Sexo bilogico" value="" />
        <Picker.Item label="Masculino" value="masculino" />
        <Picker.Item label="Femenino" value="femenino" />
      </Picker>

      <Button title="Crear Usuario" 
        color="#000066"
        style={styles.button}
        onPress={handleCrearUsuario} />

        
      {mensaje !== "" && <Text style={styles.error}>{mensaje}</Text>}
      <Text style={styles.crear}>No olvides revisar tus datos al terminar</Text>

    </View>
    </SafeAreaView>
    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: 12,
    padding: 10,
    backgroundColor: '#E3F5FF',
    borderWidth: 0, // Elimina el borde del TextInput
    borderRadius: 5, // Opcional: agregar bordes redondeados
},
button: {
    height: 30,
    margin: 22,
},

picker: {
    borderWidth: 1, // Agregar borde al picker
    borderRadius: 5, // Opcional: agregar bordes redondeados
    borderColor: '#CCCCCC', // Color del borde
},

modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
},

modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

},

imglogo: {
    width: 130,
    height: 65,
    marginStart: 135,
    marginVertical: 0,
    backgroundColor: '#FFFFFF',
},
container: {
    marginTop: 100,
    backgroundColor: '#FFFFFF',
},
crear: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    backgroundColor: '#FFFFFF',
},
background: {
    backgroundColor: '#FFFFFF',
    height: 1100,
},
error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
}
});
export default CrearCuenta;
