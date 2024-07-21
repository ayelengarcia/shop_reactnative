import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'

import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';
import { usePostOderMutation } from '../services/shopServices';

const Cart = () => {

  const { items: dataCart, total } = useSelector((state) => state.cart.value)
  
  const [ triggerPostOrder, result ] = usePostOderMutation()
  
  const handleCreateOrder = () => {
    triggerPostOrder({items: dataCart, user: "mail@mail.com", total})
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dataCart}
        renderItem={({ item }) => <CartItem cartItem={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <View>
        <Text style={styles.total}>Total: ${total}</Text>

        <Pressable onPress={handleCreateOrder}>
          <Text style={styles.textConfirm}>Confirmar orden</Text>
        </Pressable>
        
      </View>

    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20
  },
  total: {
    textAlign: "center",
    fontSize: 26
  },
  textConfirm: {
    textAlign: "center",
    color: "white",
    backgroundColor: "teal",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 8
  }

})