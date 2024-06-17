import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import ProductItem from "../components/ProductItem.jsx"

import products from "../data/products.json"
import Search from '../components/Search.jsx'

const ItemListCategory = ({ categorySelected = "", setCategorySelected = () => { } }) => {

  console.log(categorySelected)
  
  const [keyword, setKeyword] = useState("");
  const [productFiltered, setProductFiltered] = useState([]);
  const [error, setError] = useState("")

  useEffect(() => {
    const regex = /\d/
    const Digits = (regex.test(keyword))
    console.log(Digits)

    if (Digits) {
      setError("No utilices dígitos.")
      return
    }

    const productsPreFilter = products.filter((product) => product.category === categorySelected)

    const productsFilter = productsPreFilter.filter((product) => product.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))

    console.log(productsFilter)
    
    setProductFiltered(productsFilter)
  }, [keyword, categorySelected])

  return (
    <View style={styles.container}>

      {/* Search */}
      <Search onSearch={setKeyword} goBack={() => setCategorySelected("")} />
      <Text style={styles.text_error}>{error}</Text>

      {/* Lista */}
      <FlatList
        data={productFiltered}
        style={styles.container_flatList}
        keyExtractor={(product)=> product.id}
        renderItem={({ item }) =>
          <ProductItem product={item}/>}
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
    justifyContent: "space-around"
  },

  container_flatList: {
    width: "100%",
    paddingHorizontal: 50,
    paddingVertical: 20
  },
  text_error: {
    color: "red",
    width: "100%",
    paddingHorizontal: 20
  }
})