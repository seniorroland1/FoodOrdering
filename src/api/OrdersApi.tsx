import { useMutation, useQuery, useQueryClient } from "react-query";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";
import { useAuth } from "../provider/AuthProvider";

export const useGetOrders = ({ archived = false }) => {
  const queryClient = useQueryClient();
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];
  const getOrdersRequest = async () => {
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .in("status", statuses)
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error.message);
    }
    return orders;
  };
  const {
    data: orders,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(["orders", { archived }], getOrdersRequest);

  if (isError) {
    Alert.alert("Failed to fetch orders");
  }
  if (isSuccess) {
    queryClient.invalidateQueries("orders");
  }

  return { orders, isLoading, isSuccess };
};

export const useGetMyOrders = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  const queryClient = useQueryClient();
  const getMyOrdersRequest = async () => {
    if (!id) {
      return null;
    }
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error.message);
    }
    return orders;
  };
  const {
    data: orders,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(["orders"], getMyOrdersRequest);

  if (isError) {
    Alert.alert("Failed to fetch orders");
  }
  if (isSuccess) {
    queryClient.invalidateQueries(["orders"]);
  }

  return { orders, isLoading, isSuccess };
};

export const useGetMySingleOrder = (id: number) => {
  const queryClient = useQueryClient();
  const getMySingleOrderRequest = async () => {
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(*))")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error.message);
    }
    return orders;
  };
  const {
    data: order,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(["orders", id], getMySingleOrderRequest);

  if (isError) {
    Alert.alert("Failed to fetch orders");
  }
  if (isSuccess) {
    queryClient.invalidateQueries("orders");
    queryClient.invalidateQueries(["orders", id]);
  }

  return { order, isLoading, isSuccess };
};

export const useCreateOrder = async () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const id = session?.user.id;
  const createOrderRequest = async (data: any) => {
    const { data: newData, error } = await supabase
      .from("orders")
      .insert({
        ...data,
        user_id: id,
      })
      .select()
      .single();

    if (error) {
      console.log(error.message);
    }
    if (!newData) {
      throw new Error("Order could not be created");
    }
    return newData;
  };
  const {
    mutateAsync: createOrder,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(createOrderRequest);
  if (isError) {
    Alert.alert("Failed to create order");
  }
  if (isSuccess) {
    await queryClient.invalidateQueries("orders");
  }

  return { createOrder, isLoading, isSuccess };
};

export const useUpdateOrder = async (data: any, id: number, ) => {
  const queryClient = useQueryClient();
  const updateOrderRequest = async (status: string) => {
    const { data: newData, error } = await supabase
      .from("order")
      .insert({ ...data, status: status })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error.message);
    }
    if (!newData) {
      throw new Error("Order could not be updated");
    }
    return newData;
  };
  const {
    mutateAsync: updateOrder,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(updateOrderRequest);
  if (isError) {
    Alert.alert("Failed to update order");
  }
  if (isSuccess) {
    queryClient.invalidateQueries(["orders", id]);
  }
  return { updateOrder, isLoading, isSuccess };
};
