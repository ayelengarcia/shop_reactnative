import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, Image, Dimensions, Animated } from 'react-native';
import { colors } from '../global/colors';

import CategoryItem from '../components/CategoryItem';
import ProductItem from '../components/ProductItemHome';

import { useGetCategoriesQuery, useGetAllProductsQuery } from '../services/shopServices';
import { useDB } from '../persistence/useDB';

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: products } = useGetAllProductsQuery();

  const [email, setEmail] = useState('');
  const { getSession } = useDB();

  const scrollX = useRef(new Animated.Value(0)).current;

  const banners = [
    { uri: 'https://perfugroupar.vtexassets.com/assets/vtex.file-manager-graphql/images/c470a130-ca9a-4685-a1de-02a6615eb285___51b377fca6682e4a2139d9c5f2f59cbe.png' },
    { uri: 'https://perfugroupar.vtexassets.com/assets/vtex.file-manager-graphql/images/6de9d16f-a0fd-4824-b7f7-5af6785f4eab___d88c08af2bd3cceff44e10f23d920924.png' },
    { uri: 'https://perfugroupar.vtexassets.com/assets/vtex.file-manager-graphql/images/15a99950-b006-46ae-b4ac-ab6a285a06ce___6cdada60141f75452a71496eed0d092f.jpg' },
  ];

  useEffect(() => {
    (async () => {
      const response = await getSession();
      if (response) setEmail(response.email);
    })();
  }, [getSession]);

  const renderBanner = ({ item }) => (
    <Image
      style={styles.banner}
      source={{ uri: item.uri }}
      resizeMode="cover"
    />
  );

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItemContainer}>
      <CategoryItem
        category={item}
        navigation={navigation}
      />
    </View>
  );

  const renderCategoryProduct = ({ item }) => (
    <View style={styles.productItemContainer}>
      <ProductItem
        product={item}
        navigation={navigation}
      />
    </View>
  );

  const ofertasExclusivas = products?.filter(product => product.discountPercentage >= 30);
  const masRecomendados = products?.filter(product => product.rating >= 4.5);

  return (
    <ScrollView style={styles.container}>
      {/* Carrusel */}
      <View style={styles.container_carrusel}>
        <FlatList
          data={banners}
          renderItem={renderBanner}
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
          {banners.map((_, index) => {
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

      {/* Saludo user */}
      <View style={styles.container_saludo}>
        <View style={styles.container_text}>
          <Text style={styles.textHola}>Hola,</Text>
          <Text style={styles.textMail}>{email}</Text>
        </View>
      </View>

      {/* Categorias */}
      <View style={styles.container_categories}>
        <Text style={styles.textSecciones}>CATEGORÍAS</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(category) => category.category}
        />
      </View>

      {/* Ofertas exclusivas*/}
      <View style={styles.container_products}>
        <Text style={styles.textSecciones}>OFERTAS EXCLUSIVAS</Text>
        <FlatList
          data={ofertasExclusivas}
          renderItem={renderCategoryProduct}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(product) => product.id}
        />
      </View>

      {/* Los más recomendados*/}
      <View style={styles.container_products}>
        <Text style={styles.textSecciones}>LOS MÁS RECOMENDADOS</Text>
        <FlatList
          data={masRecomendados}
          renderItem={renderCategoryProduct}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(product) => product.id}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: '100%',
  },

  container_carrusel: {
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: 10,
  },
  banner: {
    width: width,
    height: 180,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.p_black,
    marginHorizontal: 8,
  },


  container_saludo: {
    marginTop: 10,
    marginBottom: -5,
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  container_text: {
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 180,
  },
  textHola: {
    fontFamily: 'Kanit-regular',
    color: colors.blue,
    fontSize: 20,
  },
  textMail: {
    fontFamily: 'Kanit-regular',
    color: colors.blue,
    fontSize: 15,
  },


  container_categories: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  categoryItemContainer: {
    width: width / 1.4,
    marginBottom: 10,
  },

  container_products: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20
  },
  productItemContainer: {
    width: width / 2,
    height: 300,
    marginBottom: 10,
  },


  textSecciones: {
    color: colors.p_black,
    fontFamily: 'Bebas-regular',
    fontWeight: '400',
    fontSize: 25,
    letterSpacing: 1,
  }
});