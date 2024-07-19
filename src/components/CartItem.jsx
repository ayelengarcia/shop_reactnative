import { StyleSheet, Text, View } from 'react-native'
import { Entypo } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { removeCartItem, removeOneCartItem } from "../features/cart/CartSlice";

const CartItem = ({ cartItem }) => {

  const dispatch = useDispatch()

  const handleRemoveCart = () => {
    dispatch(removeOneCartItem({ id: cartItem.id }));
  };

  return (
    <View style={styles.card}>

      <View style={styles.textContainer}>
        <View>
          <Text>{cartItem.quantity} {cartItem.title}</Text>
          <Text>{cartItem.brand}</Text>
        </View>

        <View style={styles.end}>
          <Text>${cartItem.price}</Text>
          <Entypo onPress={handleRemoveCart} name="trash" size={30} color="black" />
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