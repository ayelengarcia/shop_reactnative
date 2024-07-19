import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import ProductItem from "../components/ProductItem.jsx"

import Search from '../components/Search.jsx'
import { useGetProductsByCategoryQuery } from '../services/shopServices.js'

const ItemListCategory = ({
  navigation,
  route
}) => {
  
  const [keyword, setKeyword] = useState("");
  const [productFiltered, setProductFiltered] = useState([]);
  const [error, setError] = useState("")

  //le pongo un alias a category para no renombrar categorySelected
  const { category: categorySelected } = route.params

  const {data: productsFetched, error: errorFetched, isLoading} = useGetProductsByCategoryQuery(categorySelected);


  useEffect(() => {
    const regex = /[\d]/
    const Digits = (regex.test(keyword))

    if (Digits) {
      setError("No utilices dígitos.")
      return
    }

    if(!isLoading){
      const productsFilter = productsFetched.filter((product) => product.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
      setProductFiltered(productsFilter)
    }
   
  }, [keyword, categorySelected, productsFetched, isLoading])

  const volver = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>

      {/* Search */}
      <Search
        onSearch={setKeyword}
        goBack={volver} />
      
      <Text style={styles.text_error}>{error}</Text>

      {/* Lista */}
      <FlatList
        data={productFiltered}
        style={styles.container_flatList}
        keyExtractor={(product)=> product.id}
        renderItem={({ item }) =>
          <ProductItem
            product={item}
            navigation={navigation} />}
      />
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  container_flatList: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  text_error: {
    color: "red",
    width: "100%",
    paddingHorizontal: 20
  }
})