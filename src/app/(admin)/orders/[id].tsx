import { Stack, useLocalSearchParams } from "expo-router";
import { Image, Text, View, StyleSheet, FlatList } from "react-native";
import orders from "@/assets/data/orders";
import { defaultProductImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import OrderListItem from "@/src/components/orderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((order) => order.id.toString() === id);

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
