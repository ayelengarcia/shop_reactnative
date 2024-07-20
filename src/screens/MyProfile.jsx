import { StyleSheet, View, Image, Text, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useGetImageUserQuery } from '../services/shopServices';

const MyProfile = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const { imageUser, localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetImageUserQuery(localId);

  useEffect(() => {
    if (imageFromBase?.image) {
      setImage(imageFromBase.image);
    } else if (imageUser) {
      setImage(imageUser);
    }
  }, [imageFromBase, imageUser]);

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <Image
            style={styles.image}
            resizeMode='cover'
            source={{ uri: image }}
          />
          <Pressable
            onPress={() => navigation.navigate("Image Selector")}
            style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.text}>Change Profile Picture</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Image
            style={styles.image}
            resizeMode='cover'
            source={{ uri: "https://mcstaging.centraloeste.com.ar/media/wysiwyg/da7ed7b0-5f66-4f97-a610-51100d3b9fd2_1.png" }}
          />
          <Pressable
            onPress={() => navigation.navigate("Image Selector")}
            style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.text}>Add Profile Picture</Text>
          </Pressable>
        </>
      )}
      <Pressable
        onPress={() => navigation.navigate("List Address")}
          style={({ pressed }) => [styles.btn_address, { opacity: pressed ? 0.7 : 1 }]}>
        <Text style={styles.text_address}>List Address</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.btn_address, { opacity: pressed ? 0.7 : 1 }]}>
        <Text style={styles.text_address}>Otra cosa</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.btn_address, { opacity: pressed ? 0.7 : 1 }]}>
        <Text style={styles.text_address}>Mas cosas</Text>
      </Pressable>
    </View>
  );
};


export default MyProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  image: {
    height: 200,
    width: 200,
    marginTop: 20,
    zIndex: 1000,
    borderRadius: 100
  },
  btn: {
    backgroundColor: "black",
    paddingHorizontal: 35,
    paddingVertical: 5,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "Kanit-regular"
  },
  btn_address: {
    paddingHorizontal: 35,
    paddingVertical: 5,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "90%"
  },
  text_address: {
    fontSize: 16,
  }
})