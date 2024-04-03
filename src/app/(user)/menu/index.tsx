import { FlatList, ActivityIndicator } from "react-native";
import ProductListItem from "@/src/components/ProductListItem";
import { useFetchProducts } from "@/src/api/ProductApi";

export default function MenuScreen() {
  const { data: products, isLoading } = useFetchProducts();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
