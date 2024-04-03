import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import Colors from "@/src/constants/Colors";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { OrderStatusList } from "@/src/types";
import { useGetMySingleOrder, useUpdateOrder } from "@/src/api/OrdersApi";
import { useState } from "react";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const [statusText, setStatusText] = useState("");
  const { order } = useGetMySingleOrder(id);
  const { updateOrder, isLoading: isUpdatingOrderLoading } = useUpdateOrder(
    id,
    order
  );
  const handlePress = () => {
    updateOrder(statusText);
    setStatusText(statusText);
  };

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
                  disabled={isUpdatingOrderLoading}
                  onPress={handlePress}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      statusText === status ? Colors.light.tint : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color: statusText ? "white" : Colors.light.tint,
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
