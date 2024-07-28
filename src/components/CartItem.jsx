import { StyleSheet, Text, View, Image } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { colors } from '../global/colors';

import { useDispatch } from "react-redux";
import { removeOneCartItem, addCartItem, removeCartItem } from "../features/cart/CartSlice";
import { useGetProductByIdQuery } from "../services/shopServices";

const CartItem = ({ cartItem}) => {
  const dispatch = useDispatch();
  const { data: product } = useGetProductByIdQuery(cartItem.id);

  const handleRemoveOneItem = () => {
    dispatch(removeOneCartItem({ id: cartItem.id }));
  };

  const handleAddOneItem = () => {
    if (product) {
      dispatch(addCartItem({ ...product, quantity: 1 }));
    }
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ id: cartItem.id }));
  };

  const formatPrice = (price) => {
    return price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const price_descuento = () => {
    const total = cartItem.price - (cartItem.price * (cartItem.discountPercentage / 100));
    return total * cartItem.quantity;
  };

  return (
    <View style={styles.card}>
      <View style={styles.container_image}>
        <Image style={styles.image} source={{ uri: cartItem.images[0] }} />
      </View>

      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {cartItem.title}
          </Text>
          <Text style={styles.brand}>{cartItem.brand}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.counter}>
            <Text style={styles.mas_menos} onPress={handleRemoveOneItem}> - </Text>
            <Text style={styles.quantity}>{cartItem.quantity}</Text>
            <Text style={styles.mas_menos}  onPress={handleAddOneItem}> + </Text>
          </View>

          <Entypo onPress={handleRemoveCartItem} name="trash" size={20} color="black" />
        </View>

        <View style={styles.row}>
          <Text style={styles.price_tachado}>${formatPrice(cartItem.price * cartItem.quantity)}</Text>
          <Text style={styles.price}>$ {formatPrice(parseFloat(price_descuento()))}</Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
    marginBottom: 10
  },
  container_image: {
    width: "45%",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    width: "55%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 10
  },
  title: {
    color: colors.p_black,
    fontFamily: "Kanit-regular",
    fontSize: 13,
  },
  brand: {
    fontSize: 12,
    fontFamily: "Kanit-regular",
    color: "#c3c3c3",
    paddingBottom: 5
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quantity: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingHorizontal: 8,
    borderColor: colors.border
  },
  mas_menos: {
    paddingHorizontal: 8,
  },

  price_tachado: {
    fontFamily: "Bebas-regular",
    paddingLeft: 10,
    color: "#c1c1c1",
    textDecorationLine: 'line-through',
  },
  price: {
    fontFamily: "Bebas-regular",
    paddingLeft: 10,
    fontSize: 18
  },
});
