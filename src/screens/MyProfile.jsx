import { StyleSheet, View, Image, Text, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetImageUserQuery } from '../services/shopServices';
import { clearUser } from '../features/user/UserSlice';
import { useDB } from '../persistence/useDB';


const MyProfile = ({ navigation }) => {
  const { deleteSession } = useDB()
  const dispatch = useDispatch();
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


  const handleLogout = async () => {
    try {
      deleteSession();
      console.log("Sesion cerrada");
      dispatch(clearUser());
    } catch (error) {
      console.log({ errorSignOutDB: error });
    }
  }

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
      <View style={styles.container_info}>
        <View>
          <Pressable
            onPress={() => navigation.navigate("List Address")}
            style={({ pressed }) => [styles.btn_2, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.text_2}>List Address</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.btn_2, { opacity: pressed ? 0.7 : 1 }]}>
            <Text style={styles.text_2}>Account information</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.7 : 1 }]}>
          <Text style={styles.text}>Sign Out</Text>
        </Pressable>
      </View>
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
    alignItems: "center",
    height: 40
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "Kanit-regular"
  },
  btn_2: {
    backgroundColor: "white",
    paddingHorizontal: 35,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c1c1c1",
    width: 300,
    height: 60
  },
  text_2: {
    fontSize: 16,
  },
  container_info: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "40%",
    marginTop: 20
  }
})