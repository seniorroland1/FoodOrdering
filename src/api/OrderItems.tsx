import { useMutation, useQuery, useQueryClient } from "react-query";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";

export const useCreateOrderItem = async () => {
  const queryClient = useQueryClient();
  //   const { session } = useAuth();
  //   const id = session?.user.id;
  const createOrderItemRequest = async (items: any) => {
    const { data: newData, error } = await supabase
      .from("order_items")
      .insert(items)
      .select();

    if (error) {
      console.log(error.message);
    }
    if (!newData) {
      throw new Error("Order could not be created");
    }
    return newData;
  };
  const {
    mutateAsync: createOrderItem,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(createOrderItemRequest);
  if (isError) {
    Alert.alert("Failed to create orderitems");
  }
  return { createOrderItem, isLoading, isSuccess };
};

