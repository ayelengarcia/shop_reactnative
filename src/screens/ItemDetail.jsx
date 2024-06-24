import { useEffect, useState } from "react";

import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";


import allProducts from "../data/products.json";

const ItemDetail = ({
  navigation,
  route
}) => {

  const { width, height } = useWindowDimensions()
  const [orientation, setOrientation] = useState("portrait");
  const [product, setProduct] = useState(null);

  //le pongo un alias a category para no renombrar categorySelected
  const { productId: idSelected } = route.params

  useEffect(() => {
    if (width > height) setOrientation("landscape")
    else setOrientation('portrait')
  }, [width, height])

  useEffect(() => {
    const productSelected = allProducts.find(
      (product) => product.id === idSelected
    );

    setProduct(productSelected);
  }, [idSelected]);

  return (
    <View>
      <Button onPress={() => navigation.goBack()} title="Back" />
      {product ? (
        <View style={
          orientation === 'portrait' ?
            styles.mainContainer
            : styles.mainContainerLandscape
        }>
          <Image
            source={{ uri: product.images[0] }}
            style={orientation === 'portrait' ?
              styles.image
              : styles.imageLandscape}
            resizeMode="cover"
          />
          <View style={orientation === 'portrait' ?
            styles.textContainer
            : styles.textContainerLandscape}>
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Button title="Add cart"></Button>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
  },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: "grey"
  },
  imageLandscape: {
    width: "45%",
    height: 200,
  },

  textContainer: {
    flexDirection: "column",
  },
  textContainerLandscape: {
    width: "50%",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "start",
    gap: 10,
  },
  price: {
    textAlign: "right"
  }
});


// import { useEffect, useState } from "react";

// import {
//   Button,
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   useWindowDimensions,
// } from "react-native";


// import allProducts from "../data/products.json";

// const ItemDetail = ({ idSelected, setProductSelected = () => { } }) => {

//   const { width, height } = useWindowDimensions()
//   const [orientation, setOrientation] = useState("portrait");

//   const [product, setProduct] = useState(null);


//   console.log("width: " + width);
//   console.log("heigth: " + height);

//   // Landscape: Horizontal
//   // Portraint: Vertical

//   //Si quiero rotal la orientacion cambiar la propiedad en app.json
//   // "orientation": "landscape",
//   //Si quiero que se adapte cuando el telefono rota hay que quitar la propiedad.

//   //useWindowDimensions detecta la dimension

//   useEffect(() => {
//     if (width > height) setOrientation("landscape")
//     else setOrientation('portrait')
//   }, [width, height])

//   useEffect(() => {
//     //Encontrar el producto por su id
//     const productSelected = allProducts.find(
//       (product) => product.id === idSelected
//     );

//     setProduct(productSelected);
//   }, [idSelected]);

//   console.log(product);

//   return (
//     <View>
//       <Button onPress={() => setProductSelected("")} title="Back" />
//       {product ? (
//         <View style={
//           orientation === 'portrait' ?
//             styles.mainContainer
//             : styles.mainContainerLandscape
//         }>
//           <Image
//             source={{ uri: product.images[0] }}
//             style={orientation === 'portrait' ?
//               styles.image
//               : styles.imageLandscape}
//             resizeMode="cover"
//           />
//           <View style={orientation === 'portrait' ?
//             styles.textContainer
//             : styles.textContainerLandscape}>
//             <Text>{product.title}</Text>
//             <Text>{product.description}</Text>
//             <Text style={styles.price}>${product.price}</Text>
//             <Button title="Add cart"></Button>
//           </View>
//         </View>
//       ) : null}
//     </View>
//   );
// };

// export default ItemDetail;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     padding: 10,
//   },
//   mainContainerLandscape: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     padding: 10,
//     gap: 10,
//   },
//   image: {
//     width: "100%",
//     height: 250,
//     backgroundColor: "grey"
//   },
//   imageLandscape: {
//     width: "45%",
//     height: 200,
//   },

//   textContainer: {
//     flexDirection: "column",
//   },
//   textContainerLandscape: {
//     width: "50%",
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: "start",
//     gap: 10,
//   },
//   price: {
//     textAlign: "right"
//   }
// });