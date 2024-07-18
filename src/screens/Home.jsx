import { StyleSheet, View, FlatList } from 'react-native'

// import Counter from '../components/Counter.jsx'
import CategoryItem from '../components/CategoryItem.jsx'
import { useGetCategoriesQuery } from '../services/shopServices.js'


const Home = ({ navigation, route }) => {
  const {data: categories} = useGetCategoriesQuery()
  
  return (
    <View style={styles.container}>
      {/* <Counter /> */}
      <FlatList
      showsVerticalScrollIndicator={false}
        keyExtractor={category => category}
        data={categories}
        style={styles.container_flatList}
        renderItem={({ item }) =>
          <CategoryItem
            category={item}
            navigation={navigation}
          />}
      />
      
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  container_flatList:{
    paddingHorizontal: 50,
    paddingVertical: 20
  }
})