import { StyleSheet, Text, View } from 'react-native'
import { Entypo } from "@expo/vector-icons";

const CartItem = ({ cartItem }) => {
  return (
    <View style={styles.card}>

      <View style={styles.textContainer}>
        <View>
          <Text>{cartItem.quantity} {cartItem.title}</Text>
          <Text>{cartItem.brand}</Text>
        </View>

        <View style={styles.end}>
          <Text>${cartItem.price}</Text>
          <Entypo name="trash" size={30} color="black" />
        </View>
      </View>
      
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 15,
    width: "90vw"
  },
  textContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  end: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  }
})