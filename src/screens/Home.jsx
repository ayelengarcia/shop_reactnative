import { StyleSheet, View, FlatList } from 'react-native'
import categories from "../data/categories.json"
import CategoryItem from '../components/CategoryItem.jsx'
import Counter from '../components/Counter.jsx'


const Home = ({ navigation, route }) => {
  
  return (
    <View style={styles.container}>
      <Counter />
      <FlatList
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

// import { StyleSheet, View, FlatList } from 'react-native'
// import categories from "../data/categories.json"
// import CategoryItem from '../components/CategoryItem.jsx'

// const Home = ({ setCategorySelected }) => {
//   return (
//     <View style={styles.container}>

//       <FlatList
//         keyExtractor={category => category}
//         data={categories}
//         style={styles.container_flatList}
//         renderItem={({ item, index, separators }) =>
//           <CategoryItem
//             category={item}
//             selectCategory={setCategorySelected}
//           />}
//       />

//     </View>
//   )
// }

// export default Home

// const styles = StyleSheet.create({
//   container: {
//     height: "100%",
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "space-around"
//   },
//   container_flatList: {
//     width: "100%",
//     paddingHorizontal: 50,
//     paddingVertical: 20
//   }
// })