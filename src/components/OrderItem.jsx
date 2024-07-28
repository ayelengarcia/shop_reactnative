import { StyleSheet, Text, View, FlatList } from 'react-native'

const OrderItem = ({ orderItem }) => {

  const productsOrder = orderItem.items

  const formatPrice = (price) => {
    return price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  return (
    <View style={styles.container}>
      <Text>ORDEN: {orderItem.id}</Text> 
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
      <Text>TOTAL: ${formatPrice(orderItem.total)}</Text>
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