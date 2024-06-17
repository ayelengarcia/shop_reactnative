import { StyleSheet, Text, Image } from 'react-native'
import Card from "./Card.jsx"
import { colors } from "../global/colors.js"

const ProductItem = ({product}) => {
  return (
    <Card style={styles.additionalStylesCard}>

      <Text style={styles.textCategory}>{product.title}</Text>

      <Image
        resizeMode='cover'
        style={styles.image}
        source={{uri: product.images[0]}}
      />
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 100,
    borderRadius: 8,
  },
  additionalStylesCard: {
    paddingLeft: 10,
    flexDirection: "row",
    height: 120,
    width: 300,
    justifyContent: "space-between",
    margin: 10,
  },
  textCategory: {
    color: colors.p_black,
  },
});
