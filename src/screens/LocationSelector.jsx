import { StyleSheet, Text, View, Pressable } from "react-native"
import { useEffect, useState } from "react"
import MapPreview from "../components/MapPreview"

import * as Location from "expo-location"

import { ApiKeyMaps } from "../databases/googleMaps"
import { usePostLocationUserMutation } from "../services/shopServices"
import { useSelector } from "react-redux"
import { colors } from "../global/colors"


const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" })
  const [address, setAddres] = useState("")
  const [error, setError] = useState("")

  const [triggerPostUserLocation, result] = usePostLocationUserMutation()
  const { localId } = useSelector(state => state.auth.value)

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
        }
      } catch (error) {
        console.log(error)
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {

        if (location.latitude) {
          const url_reverse = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ApiKeyMaps}`;

          const response = await fetch(url_reverse);
          const data = await response.json();
          setAddres(data.results[0].formatted_address);
        }

      } catch (error) {
        console.log(error)
      }
    })();
  }, [location]);


  const confirmAddress = () => {
    const date = new Date();

    triggerPostUserLocation({
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        address: address,
        updatedAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` 
      },
      localId: localId
    })

    navigation.navigate("List Address")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MI UBICACIÓN</Text>
      {location ? (
        <>
          <Text style={styles.text}> Latitud: {location.latitude} </Text>
          <Text style={styles.text}>  Longitud: {location.longitude} </Text>
          

          <MapPreview location={location} />
          <Text style={styles.address}>Dirección:</Text>
          <Text style={styles.text}>{address}</Text>

          <Pressable
            onPress={confirmAddress}
            style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.text_btn}>Confirm Address</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.noLocationContainer}>
              <Text>{error}</Text> 
          </View>
        </>
      )}
    </View>
  );
}

export default LocationSelector

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Kanit-regular",
    fontSize: 18,
    paddingVertical: 20
  },
  text: {
    fontFamily: "Kanit-regular",
    fontSize: 15,
    color: colors.p_black
  },
  noLocationContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "gray",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    padding: 10,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#1097E9",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    elevation: 4
    
  },
  text_btn: {
    color: colors.white,
    fontFamily: "Bebas-regular",
    fontSize: 20
  }
})