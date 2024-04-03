import { ActivityIndicator, FlatList } from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import { useGetMyOrders } from "@/src/api/OrdersApi";
import { useAuth } from "@/src/provider/AuthProvider";
import { Redirect } from "expo-router";

export default function OrderScreen() {
  const { session } = useAuth();
  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }
  const { orders, isLoading: isMyOrdersLoading } = useGetMyOrders();

  if (isMyOrdersLoading) {
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
