import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import dataCart from "../data/cart.json"
import CartItem from '../components/CartItem';

const Cart = () => {

  const sumaTotal = dataCart.reduce((total, numero) => {
    return total + (numero.price * numero.quantity);
  }, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={dataCart}
        renderItem={({ item }) => <CartItem cartItem={item} />}
        keyExtractor={dataCart.id}
      />

      <View>
        <Text style={styles.total}>Total: ${sumaTotal}</Text>

        <Pressable>
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
    fontSize: "26px"
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