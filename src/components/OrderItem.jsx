import { StyleSheet, Text, View, FlatList } from 'react-native'

const OrderItem = ({ orderItem }) => {


  const productsOrder = orderItem.items

  return (
    <View style={styles.container}>
      <Text>Numero de orden: {orderItem.createdAt}</Text>
      <Text>Productos:</Text>
      <FlatList
        data={productsOrder}
        renderItem={({ item }) => {
          return (
            <View productsOrder={item}>
              <Text>{item.quantity} {item.title}</Text>
            </View >)
        }}
        keyExtractor={productsOrder.id}
      />
      <Text style={styles.detalle}>Ver detalles...</Text>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 15,
    width: "90vw"
  },
  detalle: {
    marginTop: 5,
    color: "teal"
  }
})