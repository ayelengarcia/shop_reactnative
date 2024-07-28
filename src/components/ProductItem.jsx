import { StyleSheet, Text, Image, Pressable, View } from 'react-native'
import Card from "./Card.jsx"
import { colors } from "../global/colors.js"
import { useDispatch } from 'react-redux';
import { setItemSelected } from '../features/shop/ShopSlice.js';

const ProductItem = ({ product, navigation }) => {
  const dispatch = useDispatch()

  const handleNavigate = () => {
    const productId = product.id
    dispatch(setItemSelected(product.title))
    navigation.navigate("ItemDetail", { productId })
  }

  const formatPrice = (price) => {
    return price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  const price_descuento = () => {
    const total = product.price - (product.price * (product.discountPercentage / 100));
    return total;
  }

  const stars_rating = () => {
    const ratg = product.rating;
    const roundedRating = Math.round(ratg);
    const stars = '⭐'.repeat(roundedRating);
    return stars;
  }


  return (
    <Card style={styles.additionalStylesCard}>

      <Text style={styles.dinamica}>-{product.discountPercentage}%</Text>

      <Pressable style={styles.pressable} onPress={handleNavigate}>

        <View style={styles.contain_img}>
          <Image
            resizeMode='cover'
            style={styles.image}
            source={{ uri: product.images[0] }}
          />
        </View>

        <Text style={styles.rating}> {`${stars_rating()}  (${product.rating})`}</Text>
        <Text
          style={styles.textCategory}
          numberOfLines={2}
          ellipsizeMode="tail">
          {product.title}
        </Text>
        <Text style={styles.brand}> {product.brand}</Text>

        <View style={styles.container_prices}>
          <Text style={styles.price}>$ {formatPrice(parseFloat(price_descuento()))}</Text>
          <Text style={styles.price_tachado}>$ {formatPrice(product.price)}</Text>
        </View>

        <Text style={styles.comprar}>COMPRAR</Text>

      </Pressable>
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  additionalStylesCard: {
    alignItems: "center",
    justifyContent: "center",
    width: '47%',
    marginBottom: 10
  },

  dinamica: {
    zIndex: 9999,
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: colors.dinamica,
    color: colors.white,
    fontFamily: "Bebas-regular",
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 5
  },

  pressable: {
    justifyContent: "space-between"
  },
  contain_img: {
    paddingHorizontal: 20,
    paddingTop: 10
  },
  image: {
    height: 150,
    maxWidth: 150,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    backgroundColor: colors.p_black,
  },
  rating: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingTop: 10,
    fontFamily: "Kanit-regular",
    color: "#c1c1c1",
  },
  textCategory: {
    color: colors.p_black,
    paddingHorizontal: 5,
    fontFamily: "Kanit-regular",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingTop: 5
  },
  brand: {
    fontSize: 12,
    paddingHorizontal: 8,
    fontFamily: "Kanit-regular",
    color: "#c1c1c1",
    paddingBottom: 5
  },


  container_prices: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10
  },
  price: {
    fontFamily: "Bebas-regular",
    paddingLeft: 10,
    fontSize: 20
  },
  price_tachado: {
    fontFamily: "Bebas-regular",
    paddingLeft: 10,
    color: "#c1c1c1",
    textDecorationLine: 'line-through',
  },

  comprar: {
    marginHorizontal: 10,
    marginBottom: 15,
    backgroundColor: colors.p_black,
    color: colors.white,
    textAlign: "center",
    fontFamily: "Bebas-regular",
    padding: 3,
    fontSize: 17,
    borderRadius: 5,
    elevation: 2,
  }
});
