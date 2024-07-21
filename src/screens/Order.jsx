import { StyleSheet, View, FlatList } from 'react-native'
import OrderItem from '../components/OrderItem.jsx';
import { useGetOderByUserQuery } from '../services/shopServices.js';


const Order = () => {
  const { data: dataOrders } = useGetOderByUserQuery("mail@mail.com")

  return (
    <View style={styles.container}>
      <FlatList
        data={dataOrders}
        renderItem={({ item }) => <OrderItem orderItem={item} />}
        // keyExtractor={dataOrders.id}
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