import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { useState } from 'react'

import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setImageUser } from '../features/user/UserSlice';
import { usePostImageUserMutation } from '../services/shopServices';

const ImageSelector = ({navigation}) => {

  const [image, setImage] = useState(null);
  const [triggerPostImage, result] = usePostImageUserMutation()
  const dispatch = useDispatch();
  const { localId } = useSelector((state) => state.auth.value)

  const verifyCameraPermisson = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (!status) {
      return false
    }
    return true
  }

  const pickImageCamera = async () => {
    const isCameraOk = await verifyCameraPermisson();
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.2,
      })

      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      }
    }
    
  }

  const pickImageGalery = async () => {
    const isCameraOk = await verifyCameraPermisson();
    if (isCameraOk) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.2,
      })

      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      }
    }
  }

  const confirmImage = () => {
    try {
      dispatch(setImageUser(image))
      triggerPostImage({ image, localId })
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <View style={styles.container}>
      {image
        ?
        <>
          <Image
            style={styles.image}
            resizeMode='contain'
            source={{uri: image}}/>

          <Pressable
            onPress={pickImageCamera}
            style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.text}>Take new photo</Text>
          </Pressable>

          <Pressable
            onPress={pickImageGalery}
            style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.text}>Select from gallery</Text>
          </Pressable>

          <Pressable
            onPress={confirmImage}
            style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.text}>Confirm image</Text>
          </Pressable>

        </>
        :
        <>
          <View style={styles.containerPhoto}>
            <Text>No photo to show...</Text>
          </View>
          <Pressable
            onPress={pickImageCamera}
            style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.text}>Take a photo</Text>
          </Pressable>

          <Pressable
            onPress={pickImageGalery}
            style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.text}>Select from gallery</Text>
          </Pressable>

        </>
       
      }
    </View>
  )
}

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  image: {
    height: 200,
    width: 200,
    marginTop: 20,
    borderRadius: 100
  },
  btn: {
    backgroundColor: "black",
    width: 200,
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
  containerPhoto: {
    height: 200,
    width: 200,
    marginTop: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100
  }
})