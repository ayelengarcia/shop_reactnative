import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../global/colors";

const AddressItem = ({ location, navigation }) => {

  return (
    <View style={styles.card}>

      <View style={styles.textContainer}>
        <Entypo name="location" size={30} color="red" />
        <Text style={styles.text}>{location.address}</Text>
      </View>

      <Pressable onPress={() => navigation.navigate('Location Selector')}>
          <Text style={styles.text2}>Edit</Text>
      </Pressable>

    </View>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.ligthBlue,
    elevation: 2
  },

  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  },
  text: {
    fontFamily: "Kanit-regular",
    fontSize: 13,
    color: colors.p_black,
  },
  text2: {
    fontFamily: "Kanit-regular",
    fontSize: 19,
    color: "black",
    padding: 8,
  },
});