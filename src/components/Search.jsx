import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../global/colors";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';


const Search = ({onSearch = ()=>{}, goBack = ()=>{}}) => {
  const [keyword, setKeyword] = useState("")

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={keyword}
        onChangeText={setKeyword}
      />

      <Pressable onPress={()=>onSearch(keyword)} style={styles.btn}>
        <AntDesign name="search1" size={19}/>
      </Pressable>

      <Pressable onPress={() => setKeyword("")} style={styles.btn}>
        <AntDesign name="delete" size={19} />
      </Pressable>

      <Pressable onPress={goBack} style={styles.btn}>
        <AntDesign name="back" size={19} />
      </Pressable>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    marginTop: 20
  },
  input: {
    width: 220,
    padding: 8,
    fontSize: 15,
    borderRadius: 3,
    backgroundColor: "#f9f9f9",
    color: colors.p_black,
    fontFamily: "Kanit-regular",
    border: "1px solid rgb(226 226 226)",
  },
  btn: {
    backgroundColor: colors.lightRed,
    padding: 8,
    borderRadius: 3,
    color: colors.p_black,
    border: "1px solid rgb(226 226 226)",
  }
});
