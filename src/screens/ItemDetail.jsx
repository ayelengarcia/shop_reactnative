import { useEffect, useState, useRef } from "react";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../global/colors";
import { Button, Image, StyleSheet, Text, View, Pressable, Dimensions, Animated, FlatList } from "react-native";

import { useGetProductByIdQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/cart/CartSlice";

const { width } = Dimensions.get('window');

const ItemDetail = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const { productId: idSelected } = route.params;
  const { data: product } = useGetProductByIdQuery(idSelected);

  const handleAddCart = () => {
    dispatch(addCartItem({ ...product, quantity: 1 }));
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  const renderImagenes = ({ item }) => (
    <Image
      style={styles.image}
      source={{ uri: item }}
      resizeMode="cover"
    />
  );

  const stars_rating = () => {
    const ratg = product.rating;
    const roundedRating = Math.round(ratg);
    const stars = '⭐'.repeat(roundedRating);
    return stars;
  }

  const formatPrice = (price) => {
    return price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  const price_descuento = () => {
    const total = product.price - (product.price * (product.discountPercentage / 100));
    return total;
  }


  return (
    <View style={styles.container}>

      <View style={styles.backButtonContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.p_black} />
        </Pressable>
      </View>

      {product ? (
        <View style={styles.mainContainer}>

          <View style={styles.containerCarrusel}>
            <FlatList
              data={product.images}
              renderItem={renderImagenes}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              keyExtractor={(item, index) => index.toString()}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
            />
            <View style={styles.pagination}>
              {product.images.map((_, index) => {
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                const dotOpacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp'
                });
                return <Animated.View style={[styles.dot, { opacity: dotOpacity }]} key={index.toString()} />;
              })}
            </View>
          </View>

          <View style={styles.textContainer}>

            <View>
              <View style={styles.info_top}>
                <Text style={styles.rating}> {product.brand}</Text>
                <Text style={styles.rating}> {`${stars_rating()}  (${product.rating})`}</Text>
              </View>
              


              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.description}>{product.description}</Text>


              <View style={styles.container_prices}>
                <Text style={styles.price_tachado}>$ {formatPrice(product.price)}</Text>
                <Text style={styles.dinamica}>-{product.discountPercentage}%</Text>
              </View>

              <Text style={styles.price}>$ {formatPrice(parseFloat(price_descuento()))}</Text>
              
            </View>
           
            <Button title="Agregar al carrito" onPress={handleAddCart}></Button>
          </View>

        </View>

      ) : null}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
  },
  backButtonContainer: {
    position: "absolute",
    top: 25,
    left: 25,
    zIndex: 1,
    backgroundColor: "rgba(18, 19, 19, 0.2)",
    padding: 5,
    borderRadius: 5,
  },

  containerCarrusel: {
    width: "100%",
    height: "48%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.white
  },
  image: {
    width: width/1.091,
    height: 250,
    borderRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#595959',
    margin: 8,
  },


  textContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "52%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    elevation: 4
  },

  info_top: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5
  },
  rating: {
    paddingBottom: 10,
    color: "#c3c3c3",
  },

  title: {
    color: colors.p_black,
    fontFamily: "Kanit-regular",
    fontSize: 17,
    paddingBottom: 10,
  },
  description: {
    color: "#c3c3c3",
    fontFamily: "Kanit-regular",
    fontSize: 15,
    paddingBottom: 10,
  },

  container_prices: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10
  },
  price_tachado: {
    color: "#c3c3c3",
    fontFamily: "Bebas-regular",
    fontSize: 20,
    textDecorationLine: 'line-through',
    paddingVertical: 2,
  },
  dinamica: {
    backgroundColor: colors.dinamica,
    color: colors.white,
    fontFamily: "Bebas-regular",
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 5,
    fontSize: 20,
  },
  price: {
    fontFamily: "Bebas-regular",
    fontSize: 25,
    paddingTop: 10
  },

});
