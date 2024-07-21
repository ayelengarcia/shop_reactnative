import { StyleSheet, Text, Pressable } from 'react-native'
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
        <Text style={styles.styleText}>{category} </Text>
      </Pressable>
      
    </Card>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
  },
  styleText: {
    textAlign: "center",
    padding: 15,
    color: colors.p_black,
    fontSize: 16,
    fontFamily: "Kanit-regular"
  }
})