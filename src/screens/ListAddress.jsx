import { StyleSheet, Text, View, Pressable } from "react-native"
import { useState } from "react"
import AddressItem from "../components/AddresItem"
import { useSelector } from "react-redux"
import { useGetLocationQuery } from "../services/shopServices"


const ListAddress = ({ navigation }) => {
  const [location, setLocation] = useState(null)
  // const { localId } = useSelector((state) => state.auth.value)
  // const { data: location } = useGetLocationQuery(localId)

  return location ? (
    <AddressItem
      location={location}
      navigation={navigation}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>No location set</Text>
      <Pressable
        onPress={() => navigation.navigate("Location Selector")}
        style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}>
        <Text style={styles.text_btn}>Set location</Text>
      </Pressable>
    </View>
  )
}

export default ListAddress

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    backgroundColor: "black",
    paddingVertical: 5,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    width: 200
  },
  text_btn: {
    color: "white",
    fontSize: 16,
    fontFamily: "Kanit-regular"
},
  text: {
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "Kanit-regular"
  }
})