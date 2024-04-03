import { useMutation, useQuery, useQueryClient } from "react-query";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";


export const useFetchProducts = () => {
  const fetchProductsRequest = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const {
    data: data,
    isLoading,
    isError,
  } = useQuery(["products"], fetchProductsRequest);
  if (isError) {
    Alert.alert("Can't fetch products");
  }

  return { data, isLoading };
};

export const useFetchSingleProduct = (id: number) => {
  const fetchProductRequest = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const {
    data: data,
    isLoading,
    isError,
  } = useQuery(["product", id], fetchProductRequest);
  if (isError) {
    Alert.alert("Can't fetch products");
  }

  return { data, isLoading };
};

export const useCreateProduct = async () => {
  const queryClient = useQueryClient();
  const createProductRequest = async (data: any) => {
    const { data: newData, error } = await supabase
      .from("products")
      .insert({
        name: data.name,
        price: data.price,
        image: data.image,
      })
      .single();

    if (error) {
      console.log(error.message);
    }
    if (!newData) {
      throw new Error("Product could not be created");
    }
    return newData;
  };
  const {
    mutateAsync: createProduct,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(createProductRequest);
  if (isError) {
    Alert.alert("Failed to create product");
  }
  if (isSuccess) {
    await queryClient.invalidateQueries("products");
  }

  return { createProduct, isLoading, isSuccess };
};

export const useUpdateProduct = async (id: number) => {
  const queryClient = useQueryClient();
  const updateProductRequest = async (data: any) => {
    const { data: newData, error } = await supabase
      .from("products")
      .insert({
        name: data.name,
        price: data.price,
        image: data.image,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.log(error.message);
    }
    if (!newData) {
      throw new Error("Product could not be updated");
    }
    return newData;
  };
  const {
    mutateAsync: updateProduct,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(updateProductRequest);
  if (isError) {
    Alert.alert("Failed to update product");
  }
  if (isSuccess) {
    await queryClient.invalidateQueries("products");
  }

  return { updateProduct, isLoading, isSuccess };
};

export const useDeleteProduct = async (id: number) => {
  const queryClient = useQueryClient();
  const deleteProductRequest = async () => {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error.message);
    }
    if (!data) {
      throw new Error("Product could not be delete");
    }
    return data;
  };
  const {
    mutateAsync: deleteProduct,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(deleteProductRequest);
  if (isError) {
    Alert.alert("Failed to delete product");
  }
  if (isSuccess) {
    await queryClient.invalidateQueries("products");
  }

  return { deleteProduct, isLoading, isSuccess };
};
