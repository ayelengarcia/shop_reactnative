import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.styleText}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.p_black,
    alignItems: "center",
    justifyContent:"center",
    width: "100%",
    height: 70,
    padding: 5
  },
  styleText: {
    fontFamily: "Bebas-regular",
    color: "white",
    fontSize: 26,
    fontWeight: "400"
  }
})