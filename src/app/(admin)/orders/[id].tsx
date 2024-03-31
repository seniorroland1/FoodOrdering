import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import orders from "@/assets/data/orders";
import Colors from "@/src/constants/Colors";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { OrderStatusList } from "@/src/types";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((order) => order.id.toString() === id);
  if (!order) {
    return;
  }
  const handlePress = () => {};

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
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={handlePress}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color: order.status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
