import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { supabase } from "../lib/supabase";

export const useCreateOrderListener = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const orderSubcription = supabase

      .channel("custom-insert-channel")
      .on(
        "postgress_changes",
        { schema: "public", table: "orders" },
        (payload) => {
          queryClient.invalidateQueries(["orders"]);
        }
      )
      .subscribe();

    return () => {
      orderSubcription.unsubscribe();
    };
  }, []);
};

export const useUpdateOrderListener = (id: number) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const order = supabase

      .channel("custom-filter-channel")
      .on(
        "postgress_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries(["orders", id]);
        }
      )
      .subscribe();

    return () => {
      order.unsubscribe();
    };
  }, []);
};
