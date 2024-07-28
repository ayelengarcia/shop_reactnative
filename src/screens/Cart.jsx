import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';
import { usePostOderMutation } from '../services/shopServices';

const Cart = () => {
  const { items: dataCart, total } = useSelector((state) => state.cart.value);
  const [triggerPostOrder, result] = usePostOderMutation();

  const handleCreateOrder = () => {
    triggerPostOrder({ items: dataCart, user: "mail@mail.com", total });
  };

  const imgCart = "https://img.freepik.com/vector-gratis/ilustracion-concepto-carrito-compras-supermercado_114360-22408.jpg?t=st=1722192286~exp=1722195886~hmac=218a5bf59d90436c9db36bf3e4fd8b0aed3bf87dd563b56b9523baef58ad95f0&w=740";

  return (
    <View style={styles.container}>
      {dataCart.length === 0 ? (

        <View>
          <Image source={{ uri: imgCart }} style={styles.emptyCartImage} />
          <Text style={styles.cart_text}>OPPS, TU CARRITO ESTÁ VACÍO</Text>
        </View>
        
      ) : (
          
        <>
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
        </>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white"
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
  },
  emptyCartImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 40,
  },
  cart_text: {
    marginTop: 40,
    fontFamily: "Bebas-regular",
    fontSize: 25
  }
});
