import { StyleSheet, View } from 'react-native'

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
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 10,
    boxShadow: '2px 2px 3px rgba(0,0,0,0.05)',
    elevation: 2,
  }
});
