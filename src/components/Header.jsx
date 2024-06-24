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
    backgroundColor: colors.lightRed,
    alignItems: "center",
    justifyContent:"center",
    width: "100%",
    padding: 5
  },
  styleText: {
    fontFamily: "Bebas-regular",
    color: colors.p_black,
    fontSize: "1.8rem",
    fontWeight: "400"
  }
})