import { ActivityIndicator, FlatList } from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import { useGetOrders } from "@/src/api/OrdersApi";
import { useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { useCreateOrderListener } from "@/src/api/Subcriptions";

export default function OrderScreen() {
  const { orders, isLoading: isOrdersLoading } = useGetOrders({
    archived: false,
  });

  if (isOrdersLoading) {
    return <ActivityIndicator />;
  }

  useCreateOrderListener();
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
