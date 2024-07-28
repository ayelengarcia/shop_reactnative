import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Button } from 'react-native';
import OrderItem from '../components/OrderItem.jsx';
import { useGetOderByUserQuery } from '../services/shopServices.js';
import { useDB } from '../persistence/useDB';

const Order = () => {
  const [refetchFlag, setRefetchFlag] = useState(0);
  const [email, setEmail] = useState('');
  const { getSession } = useDB();

  useEffect(() => {
    (async () => {
      const response = await getSession();
      if (response) setEmail(response.email);
    })();
  }, [getSession]);

  const { data: dataOrders, refetch } = useGetOderByUserQuery(email);

  //Actualizar ordenes
  const handleRefresh = () => {
    refetch(); 
    setRefetchFlag(prev => prev + 1);
  };

  return (
    <View style={styles.container}>

      <Button title="Actualizar" onPress={handleRefresh} />

      {!dataOrders
        ?
        <Text>No hay órdenes disponibles.</Text>
        :
        <FlatList
          data={dataOrders}
          renderItem={({ item }) => <OrderItem orderItem={item} />}
        // keyExtractor={(item) => item.id}
        />
      }
      
    </View>
  );
}

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%"
  }
});
