import { StyleSheet, Text, View, Pressable } from "react-native"
import { useEffect, useState } from "react"
import MapPreview from "../components/MapPreview"

import * as Location from "expo-location"

import { ApiKeyMaps } from "../databases/googleMaps"
import { usePostLocationUserMutation } from "../services/shopServices"
import { useSelector } from "react-redux"


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
      <Text style={styles.text}>My Address</Text>
      {location ? (
        <>
          <Text style={styles.text}>
            Lat: {location.latitude}, long: {location.longitude}.
          </Text>

          <MapPreview location={location} />
          <Text style={styles.address}>Formatted address: {address}</Text>
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
    justifyContent: "flex-start",
  },
  text: {
    paddingTop: 20,
    fontFamily: "Kanit-regular",
    fontSize: 18,
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
})