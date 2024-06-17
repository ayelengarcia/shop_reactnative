import { StyleSheet, Text, Pressable } from 'react-native'
import Card from './Card.jsx';
import { colors } from '../global/colors'

const CategoryItem = ({ category, selectCategory= () => {} }) => {
  return (
    <Card style={styles.cardContainer}>

      <Pressable onPress={()=>{selectCategory(category)}} >
        <Text style={styles.styleText}>{category} </Text>
      </Pressable>
      
    </Card>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  styleText: {
    textAlign: "center",
    padding: 15,
    color: colors.p_black,
    fontSize: "1.2rem",
    fontFamily: "Kanit-regular"
  }
})