import { View, Text, StyleSheet, Pressable } from "react-native";
import { Order } from "../types";
import { Link, useSegments } from "expo-router";

type Props = {
  order: Order;
};
const OrderListItem = ({ order }: Props) => {
  const segments = useSegments();
  return (
    <Link href={`/${segments[0]}/orders/${order.id}`}>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.order_id}>Order #{order.id}</Text>

          {/* install dayjs libarary */}
          <Text style={styles.createdAt}>
            {dayjs(order.created_at).fromNow()}
          </Text>
        </View>
        <Text>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: "white",
    padding: 5,
  },
  order_id: {
    fontWeight: "600",
    fontSize: 15,
  },
  createdAt: {
    color: "gray",
  },
  status: {
    fontWeight: "bold",
  },
});
export default OrderListItem;
