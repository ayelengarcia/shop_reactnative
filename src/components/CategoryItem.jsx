import { StyleSheet, Text, Pressable, Image } from 'react-native'
import Card from './Card.jsx';
import { colors } from '../global/colors'

import { useDispatch } from 'react-redux';
import { setCategorySelected } from '../features/shop/ShopSlice.js';

const CategoryItem = ({ category, navigation }) => {

  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setCategorySelected(category))
    navigation.navigate("ItemListCategory", {category})
  }

  return (
    <Card style={styles.cardContainer}>

      <Pressable onPress={handleNavigate} >

        <Image
          style={styles.imagen}
          source={{ uri: category.img }}
          resizeMode="cover"
        />

        <Text style={styles.styleText}>{category.category} </Text>
      </Pressable>
      
    </Card>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  cardContainer: {
    width: "97%",
    height: 180,
    borderWidth: 1,
    borderColor: colors.border
  },
  styleText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 16,
    fontFamily: "Kanit-regular",
    position: "absolute",
    backgroundColor: colors.blue,
    padding: 10,
    marginTop: 110,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 2
  },
  imagen: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  }
})