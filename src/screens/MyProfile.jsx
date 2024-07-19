import { StyleSheet, View, Image, Text, Pressable } from 'react-native'
import { useState } from 'react'

const MyProfile = ({ navigation }) => {

  const [image, setImage] = useState(null);

  return (
    <View style={styles.container}>
      {image ? 
        null :
        <>
          <Image
            style={styles.image}
            resizeMode='cover'
            source={{ uri: "https://mcstaging.centraloeste.com.ar/media/wysiwyg/da7ed7b0-5f66-4f97-a610-51100d3b9fd2_1.png" }} 
          />

          <Pressable
            onPress={() => navigation.navigate("Image Selector")}
            style={({pressed})=> [styles.btn, {opacity: pressed ? 0.7 : 1}] }>
            <Text style={styles.text}>Add Profile Picture</Text>
          </Pressable>
        </>
      }
    </View>
  )
}

export default MyProfile

//mail@prueba.com

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
  }
})