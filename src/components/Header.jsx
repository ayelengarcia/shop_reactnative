import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetImageUserQuery } from "../services/shopServices.js";
import { useGetLocationUserQuery } from "../services/shopServices";
import { colors } from "../global/colors";
import { Entypo } from "@expo/vector-icons";

const Header = ({ navigation, title }) => {
  const [image, setImage] = useState(null);
  const { imageUser, localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetImageUserQuery(localId);

  const { data: location } = useGetLocationUserQuery(localId);

  useEffect(() => {
    if (imageFromBase?.image) {
      setImage(imageFromBase.image);
    } else if (imageUser) {
      setImage(imageUser);
    }
  }, [imageFromBase, imageUser]);

  return (
    <View style={styles.container}>

      {/* Ubicación del usuario */}
      <View style={styles.adress_contain}>
        <Entypo style={styles.ubica} name="location" size={15} color="white" />

        {location ? (
          <Text style={styles.text}> {location.address}</Text>
        ) : (
          <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("Location Selector")}>
              <Text style={styles.text}>Sin ubicación</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Menú general */}
      <View style={styles.contain_menu}>
        <Text style={styles.styleText}>{title}</Text>

        <Pressable
          style={styles.container_img}
          onPress={() => navigation.navigate("PERFIL")}
        >
          {image ? (
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: image }}
            />
          ) : (
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{
                uri: "https://mcstaging.centraloeste.com.ar/media/wysiwyg/da7ed7b0-5f66-4f97-a610-51100d3b9fd2_1.png",
              }}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    width: "100%",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    boxShadow: '4px 4px 5px rgba(0,0,0,1)',
    elevation: 6,
  },
  contain_menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20
  },
  styleText: {
    fontFamily: "Kanit-regular",
    color: colors.white,
    fontSize: 20,
    fontWeight: "400",
  },
  container_img: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white'
  },
  adress_contain: {
    flexDirection: "row",
    backgroundColor: colors.ligthBlue,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 5
  },
  text: {
    color: colors.p_black,
    fontSize: 9,
    marginLeft: 3,
    paddingVertical: 10,
  },
  ubica: {
    color: "#BE2517",
  },
});
