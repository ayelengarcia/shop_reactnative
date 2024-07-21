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
    gap: 7,
    marginTop: 20
  },
  input: {
    width: 200,
    height: 40,
    padding: 8,
    fontSize: 15,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#c1c1c1",
    backgroundColor: "#f9f9f9",
    color: colors.p_black,
    fontFamily: "Kanit-regular",
  },
  btn: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 3,
    borderWidth: 1,
    border: "1px solid rgb(226 226 226)",
  }
});
