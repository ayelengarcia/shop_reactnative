import { StyleSheet, Text, View } from 'react-native'

const Card = ({ children, style }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    border: "1px solid rgb(226 226 226)",
    backgroundColor: "rgb(255 235 235)",
    borderRadius: 5,
    marginTop: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  }
});
