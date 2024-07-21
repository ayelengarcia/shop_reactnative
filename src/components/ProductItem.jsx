import { StyleSheet, Text, Image, Pressable } from 'react-native'
import Card from "./Card.jsx"
import { colors } from "../global/colors.js"

import { useDispatch } from 'react-redux';
import { setItemSelected } from '../features/shop/ShopSlice.js';

const ProductItem = ({
  product,
  navigation
}) => {

  
  const dispatch = useDispatch()

  const handleNavigate = () => {
    const productId = product.id
    dispatch(setItemSelected(product.title))
    navigation.navigate("ItemDetail", { productId })
  }

  return (
    <Card style={styles.additionalStylesCard}>

      <Pressable
        style={styles.pressable}
        onPress={handleNavigate}
      >
        <Text style={styles.textCategory}>{product.title}</Text>

        <Image
          resizeMode='cover'
          style={styles.image}
          source={{ uri: product.images[0] }}
        />

      </Pressable>
    
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  additionalStylesCard: {
    paddingLeft: 10,
    height: 120,
    width: "100%",
    justifyContent: "space-between",
  },
  pressable: {
    flexDirection: "row",
  },
  textCategory: {
    color: colors.p_black,
    padding: 8,
    width: "65%",
  },
  image: {
    height: 120,
    width: "35%",
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    backgroundColor: colors.p_black
  }
});