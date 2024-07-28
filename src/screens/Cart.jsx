import { StyleSheet, Text, View, FlatList, Pressable, Image, ScrollView } from 'react-native';
import { colors } from '../global/colors';
import { Entypo } from "@expo/vector-icons";

import CartItem from '../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { usePostOderMutation, useGetLocationUserQuery } from '../services/shopServices';
import { clearCart } from "../features/cart/CartSlice";
import { useDB } from '../persistence/useDB';
import { useEffect, useState } from 'react';

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();

  const { items: dataCart, total } = useSelector((state) => state.cart.value);
  const [triggerPostOrder, result] = usePostOderMutation();

  const { localId } = useSelector((state) => state.auth.value);
  const { data: location } = useGetLocationUserQuery(localId);

  const [email, setEmail] = useState('');
  const { getSession } = useDB();

  useEffect(() => {
    (async () => {
      const response = await getSession();
      if (response) setEmail(response.email);
    })();
  }, [getSession]);


  const handleCreateOrder = () => {
    triggerPostOrder({ items: dataCart, user: email, total })
      .unwrap()
      .then(() => {
        dispatch(clearCart());
      })
      .catch((error) => {
        console.error('Error al crear la orden:', error);
      });
  };

  const formatPrice = (price) => {
    return price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const imgCart = "https://img.freepik.com/vector-gratis/ilustracion-concepto-carrito-compras-supermercado_114360-22408.jpg?t=st=1722192286~exp=1722195886~hmac=218a5bf59d90436c9db36bf3e4fd8b0aed3bf87dd563b56b9523baef58ad95f0&w=740";

  return (
    <View style={styles.container}>
      {dataCart.length === 0 ? (

        <View style={styles.container_carrito}>
          <Image source={{ uri: imgCart }} style={styles.emptyCartImage} />
          <Text style={styles.cart_text}>OPPS, TU CARRITO ESTÁ VACÍO</Text>
        </View>
        
      ) : (
          
        <>
            <FlatList
            style={styles.container_flatList}
            data={dataCart}
            renderItem={({ item }) => <CartItem cartItem={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
            <View style={styles.container_detalle}>

              <View style={styles.row}>
                <Entypo style={styles.ubica} name="location" size={15} color="white" />
                <Text style={styles.text}>Dirección de envío:</Text>
              </View>

              {location ? ( 
                <Text style={styles.direccion}>{location.address}</Text>
              ) : (
                  <Pressable onPress={() => navigation.navigate("Location Selector")}>
                    <Text style={styles.direccion}>Sin ubicación</Text>
                  </Pressable>
              )}
              
              <View style={styles.row2}>
                <Text style={styles.text2}>Total</Text>
                <Text style={styles.text2}>$ {formatPrice(total)}</Text>
              </View>
              
              <Pressable style={styles.container_payment} onPress={handleCreateOrder}>
                <Text style={styles.textConfirm}>CONFIRMAR COMPRA</Text>
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
    backgroundColor: colors.white,
    alignItems: "center",
    width: "100%"
  },

  // Carrito VACIO
  container_carrito: {
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 40,
    paddingHorizontal: 40,
    paddingBottom: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
    elevation: 2
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
},


  //Detalle de carrito
  container_flatList: {
    paddingTop: 15,
    paddingHorizontal: 20
  },
  container_detalle: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: colors.ligthBlue,
    padding: 20,
    elevation: 2,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    elevation: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  ubica: {
    color: "#BE2517",
  },
  text: {
    fontFamily: "Kanit-regular",
  },
  direccion: {
    fontFamily: "Kanit-regular",
    color: colors.p_black,
    paddingLeft: 20,
    fontSize: 12
  },



  row2: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 15
  },
  text2: {
    fontFamily: "Kanit-regular",
    fontSize: 18
  },

  container_payment: {
    width: "100%"
  },
  textConfirm: {
    textAlign: "center",
    color: "white",
    backgroundColor: "#1097E9",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 22,
    fontFamily: "Bebas-regular",
    borderRadius: 5,
    elevation: 5
  }
});
