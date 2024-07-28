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

  return (
    <Card style={styles.additionalStylesCard}>

      <Pressable onPress={handleNavigate}>

        <View style={styles.contain_img}>
          <Image
            resizeMode='cover'
            style={styles.image}
            source={{ uri: product.images[0] }}
          />
        </View>
       
        <Text style={styles.textCategory}>{product.title}</Text>
      </Pressable>
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  additionalStylesCard: {
    alignItems: "center",
    justifyContent: "center",
    width: '95%',
    height: 300
  },
  contain_img: {
    paddingHorizontal: 20,
    paddingTop: 10
  },
  textCategory: {
    color: colors.p_black,
    paddingHorizontal: 5,
    fontFamily: "Kanit-regular",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  image: {
    height: 170,
    maxWidth: 150,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    backgroundColor: colors.p_black,
  }
});
