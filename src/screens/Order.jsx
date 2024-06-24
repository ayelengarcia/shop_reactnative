import { StyleSheet, Text, View, FlatList } from 'react-native'
import dataOrders from "../data/orders.json"
import OrderItem from '../components/OrderItem.jsx';


const Order = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dataOrders}
        renderItem={({ item }) => <OrderItem orderItem={item} />}
        keyExtractor={dataOrders.id}
      />
    </View>
  )
}

export default Order

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20
  }
})