import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const AddressItem = ({ location, navigation }) => {

  return (
    <View style={styles.card} onPress={() => { }}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{location.address}</Text>
      </View>
      <Pressable onPress={() => navigation.navigate('Location Selector')}>
        <Entypo name="location" size={30} color="white">
          <Text style={styles.text2}>Change</Text>
        </Entypo>
      </Pressable>
    </View>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: "gray",
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Kanit-regular",
    fontSize: 17,
    color: "white",
  },
  text2: {
    fontFamily: "Kanit-regular",
    fontSize: 19,
    color: "black",
    padding: 8,
  },
});