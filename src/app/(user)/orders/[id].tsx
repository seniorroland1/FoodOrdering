import { Stack, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Colors from "@/src/constants/Colors";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { useGetMySingleOrder } from "@/src/api/OrdersApi";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { order, isLoading: isMyOrdersLoading } = useGetMySingleOrder(id);

  if (isMyOrdersLoading) {
    return <ActivityIndicator />;
  }

  if (!order) {
    return;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order#${id}` }} />
      <View style={{ padding: 10 }}>
        <Text>Order#{order.id}</Text>
      </View>
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    flexDirection: "row",
    rowGap: 2,
  },
  infoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    rowGap: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  image: {
    width: 30,
    aspectRatio: 1,
  },
  quantity: {
    fontWeight: "bold",
  },
  size: {
    fontWeight: "bold",
  },
});
export default OrderDetailScreen;
