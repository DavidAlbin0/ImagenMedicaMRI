import React, { useState, useEffect, useRef } from "react"; // Asegúrate de importar useState y useEffect
import * as Location from "expo-location";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import IMAGES from "../assets/indexm";
import { useNavigation } from "@react-navigation/native";
//import MapViewDirections from "react-native-maps-directions";
//import { GOOGLE_MAPS_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import Geolocation from '@react-native-community/geolocation';

const data = [
  { id: 1, title: "CheckUps", image: IMAGES.CheckUps },
  { id: 2, title: "Reembolsos", image: IMAGES.Reembolsos },
  { id: 3, title: "Resonancias", image: IMAGES.Resonancias },
  { id: 4, title: "Tomografías", image: IMAGES.Tomografías },
];

const HomeScreen = () => {
  const carouselRef = useRef(null);
  const [isCarouselSnapping, setCarouselSnapping] = useState(false);
  const navigation = useNavigation();
  const [sucursal, guardarSucursal] = useState("");
  const [origin, setOrigin] = useState({});
  const scrollViewRef = useRef(null);
  const [token, setToken] = useState(null);

  const [destination, setDestination] = useState({
    latitude: 18.92611986330235,
    longitude: -99.22881946670378,
  });
  const [region] = useState({
    latitude: 18.82915220343986,
    longitude: -99.12603465859554,
    latitudeDelta: 0.95,
    longitudeDelta: 0.55,
  });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permiso denegado para acceder a la ubicación");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(currentLocation);
    setMarkers([
      {
        latlng: currentLocation,
        title: "Ubicación Actual",
        description: "¡Aquí estás!",
      },
      {
        latlng: { latitude: 18.92611986330235, longitude: -99.22881946670378 },
        title: "Cuernavaca",
        description: "Matriz",
      },
      {
        latlng: { latitude: 18.6184380430732, longitude: -99.19236776289777 },
        title: "Jojutla",
        description: "Sucursal",
      },
      {
        latlng: { latitude: 18.899008357371454, longitude: -99.17100853448245 },
        title: "Jiutepec",
        description: "Sucursal",
      },
      {
        latlng: { latitude: 18.81995675918374, longitude: -98.9479670766359 },
        title: "Cuautla",
        description: "Sucursal",
      },
    ]);
  };

  const onRegionChange = (newRegion) => {};

  const _renderItem = ({ item, index }) => {
    return (
      <SafeAreaView>
        <Image
          source={item.image}
          style={{
            height: Dimensions.get("window").width,
            width: Dimensions.get("window").width,
          }}
        />
      </SafeAreaView>
    );
  };

  //Se obtiene el token aqui
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        console.log("Token almacenado:", storedToken);
        setToken(storedToken);
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    };
    getToken();

    // Establecer un intervalo para verificar el token cada cierto tiempo
    const interval = setInterval(getToken, 5000); // Verificar cada 5 segundos

    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => clearInterval(interval);
  }, []);

  //Navegacion de las imagenes principales

  //navega al mapa de la sucursales
  const handleScrollToSucursales = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: 2100, // Cambia esto según la altura de los componentes que quieres saltar
        animated: true,
        duration: 100000, // Duración de la animación en milisegundos
      });
    }
  };

  //navega a los servicios
  const handleScrollToServicios = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: 700, // Cambia esto según la altura de los componentes que quieres saltar
        animated: true,
        duration: 100000, // Duración de la animación en milisegundos
      });
    }
  };

  //navega a la pantalla de analisis clinicos
  const handlePress = () => {
    if (token) {
      // Si hay un token, navega a la pantalla de HistoriaslEstudios
      navigation.navigate("HistorialStudio");
    } else {
      // Si no hay un token, navega a la pantalla de Settings
      navigation.navigate("Configuracion");
    }
  };

  //Esto hace que el carrousel vaya del 4 al 1

  const handleSnapToItem = (index) => {
    if (index === data.length - 1 && !isCarouselSnapping) {
      setCarouselSnapping(true);
      setTimeout(() => {
        carouselRef.current.snapToItem(0);
        setCarouselSnapping(false);
      }, 5000); // Ajusta el tiempo de espera en milisegundos según tus preferencias
    }
  };

  return (
    <SafeAreaView style={styles.colordelfondo}>
      <SafeAreaView style={styles.contaComp}>
        <ScrollView ref={scrollViewRef}>
          {/* Recuadro Azul */}
          <SafeAreaView style={styles.container}>
            <Image
              source={require("../assets/logos/logoph.png")}
              style={styles.mid}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.backg}>
            <Carousel
              ref={carouselRef}
              data={data}
              renderItem={_renderItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width}
              autoplay={true} //Que se mueva solo
              autoplayInterval={4000} //que se mueva cada 5 segundos
              lockScrollWhileSnapping={true} // Establecer lockScrollWhileSnapping en true
              onSnapToItem={handleSnapToItem} //Reinicia el carousel
            />
          </SafeAreaView>
          <SafeAreaView>
            <SafeAreaView style={styles.titulo}>
              <Text style={styles.subtitulo1}>¡Bienvenido!</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.flexIcon}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={handleScrollToSucursales}
              >
                <Image
                  source={require("../assets/iconos/Ubicaciones.png")}
                  style={styles.imageNav}
                />
                <Text>Sucursales</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={handleScrollToServicios}
              >
                <Image
                  source={require("../assets/iconos/Estetoscopio.png")}
                  style={styles.imageNav}
                />
                <Text>Servicios</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={handlePress}
              >
                <Image
                  source={require("../assets/iconos/Agenda.png")}
                  style={styles.imageNav}
                />
                <Text>Resultados</Text>
              </TouchableOpacity>
            </SafeAreaView>

            <SafeAreaView style={styles.titulo}>
              <Text style={styles.subtitulo11}>Conoce Nuestros Servicios</Text>
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.containerflex}>
            <SafeAreaView style={styles.izquierdaflex}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AnalisisClinicos")}
              >
                <Image
                  source={require("../assets/iconos/Microscopio.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>Analisis Clinicos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cardiologia")}
              >
                <Image
                  source={require("../assets/iconos/Microscopio.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>Cardiologia</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Colposcopia")}
              >
                <Image
                  source={require("../assets/iconos/Microscopio.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>Colposcopia</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Densitometria")}
              >
                <Image
                  source={require("../assets/iconos/Microscopio.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>Densitometria</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("GastroEnter")}
              >
                <Image
                  source={require("../assets/iconos/Resonancia.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>GastroEnterologia</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Mastogra")}>
                <Image
                  source={require("../assets/iconos/Resonancia.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>Mastografia</Text>
              </TouchableOpacity>
            </SafeAreaView>

            <SafeAreaView style={styles.derechaflex}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Neurofisiologia")}
              >
                <Image
                  source={require("../assets/iconos/Resonancia.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>Neurofisiologia</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("RayosX")}>
                <Image
                  source={require("../assets/iconos/Resonancia.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>RayosX</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("RayosxContrastados")}
              >
                <Image
                  source={require("../assets/iconos/Resonancia.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>RayosX contrastados</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ResonanciaMagnetica")}
              >
                <Image
                  source={require("../assets/iconos/Resonancia.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>Resonancia Magnetica</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("TomogrMultic")}
              >
                <Image
                  source={require("../assets/iconos/Resonancia.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>Tomografías</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("UltrasonConDop")}
              >
                <Image
                  source={require("../assets/iconos/Ultrasonido.png")}
                  style={styles.imagen}
                />
                <Text style={{textAlign: 'center'}}>UltraSonido</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.contaComp}>
            <SafeAreaView style={styles.titulo}>
              <Text style={styles.subtitulo11}>
                ¿No conoces tu sucursal más cercana?
              </Text>
              <Text style={styles.subtitulo2}>Encuéntrala aquí</Text>
            </SafeAreaView>

            <MapView
              style={styles.map}
              region={region}
              onRegionChange={onRegionChange}
            >
          
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description}
                />
              ))}
            </MapView>
            <Text style={styles.calidadCalid}>
              Calidad y calidez, para tu salud{" "}
            </Text>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: 65,
    marginTop: 40,
  },

  colordelfondo: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
  },
  titulo: {
    textAlign: "left",
    textTransform: "uppercase",
    fontSize: 21,
    color: "#000000",
    marginTop: 35,
    backgroundColor: "#000684",
    height: 45,
    marginHorizontal: 30,
    borderRadius: 10, // Agrega esquinas redondeadas
    paddingHorizontal: 15, // Añade espacio interno horizontal
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Agrega sombra para efecto de volumen en Android
  },

  titulo2: {
    textAlign: "left",
    textTransform: "uppercase",
    fontSize: 21,
    color: "#000000",
    fontWeight: "800",
    marginTop: 15,
    marginHorizontal: 30,
    marginStart: 12,
    backgroundColor: "#D75CFF",
    height: 215,
  },
  backg: {
    backgroundColor: "#ffffff",
  },
  mid: {
    height: 60,
    width: 120,
    marginStart: 15,
    marginTop: 5,
    marginBottom: 10,
    flexDirection: "row",
  },
  map: {
    width: "90%", // Ajusta el ancho según tus preferencias
    height: 600, // Ajusta la altura según tus preferencias
    alignSelf: "center", // Para centrar el mapa
    marginTop: 25, // Ajusta el margen superior según tus preferencias
    marginBottom: 10, // Ajusta el margen inferior según tus preferencias
    marginHorizontal: "5%", // Ajusta el margen horizontal según tus preferencias
  },

  subtitulo1: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 19,
    color: "#ffffff",
    fontWeight: "900",
    marginTop: 10,
  },

  subtitulo11: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "900",
    marginTop: 6,
  },

  subtitulo2: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 5,
  },

  subtitulo3: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 15,
    color: "#000000",
    fontWeight: "700",
    marginTop: 40,
    marginBottom: -65,
  },
  picker: {
    flex: 1,
    alignContent: "center",
  },

  containerflex: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    //backgroundColor: 'yellow',
    flexDirection: "row",
    marginTop: 70,
    marginBottom: 60,
  },

  derechaflex: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },

  izquierdaflex: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },

  flexIcon: {
    flexDirection: "row",
    justifyContent: "space-around", // Esto distribuirá los elementos equitativamente
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: 45, // Puedes ajustar el margen superior según tus preferencias
  },

  imageContainer: {
    flex: 1, // Esto permite que cada imagen ocupe la misma cantidad de espacio
    alignItems: "center",
  },

  imageNav: {
    height: 80,
    width: 80,
    justifyContent: "space-around",
  },

  imagen: {
    height: 120,
    width: 120,
    marginTop: 45,
  },

  calidadCalid: {
    textAlign: "center",
    fontSize: 15,
    color: "#0056BD",
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 15,
  },
});

export default HomeScreen;
