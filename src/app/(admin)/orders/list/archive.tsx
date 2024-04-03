import { ActivityIndicator, FlatList } from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import { useGetOrders } from "@/src/api/OrdersApi";

export default function OrderScreen() {
  const { orders, isLoading: isOrdersLoading } = useGetOrders({
    archived: true,
  });

  if (isOrdersLoading) {
    return <ActivityIndicator />;
  }
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
