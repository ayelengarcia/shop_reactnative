import { StyleSheet, Text, View } from 'react-native'
import { Entypo } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { removeCartItem, removeOneCartItem } from "../features/cart/CartSlice";

const CartItem = ({ cartItem }) => {

  const dispatch = useDispatch()

  const handleRemoveCart = () => {
    dispatch(removeOneCartItem({ id: cartItem.id }));
  };

  const formatPrice = (price) => {
    return price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  const price_descuento = () => {
    const total = cartItem.price - (cartItem.price * (cartItem.discountPercentage / 100));
    return total;
  }

  return (
    <View style={styles.card}>

      <View style={styles.textContainer}>

        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail">
            {cartItem.quantity} {cartItem.title}
          </Text>
          <Text>{cartItem.brand}</Text>
        </View>

        <View style={styles.end}>

          
          <Text>${formatPrice(cartItem.price)}</Text>
          <Text style={styles.price}>$ {formatPrice(parseFloat(price_descuento()))}</Text>

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
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  end: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  }
})