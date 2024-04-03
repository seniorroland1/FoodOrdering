import { Redirect, Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Text,
  View,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { defaultProductImage } from "@/src/components/ProductListItem";
import Button from "@/src/components/Button";
import { useCart } from "@/src/provider/CartProvider";
import { PizzaSize } from "@/src/types";
import { useFetchSingleProduct } from "@/src/api/ProductApi";
import { useAuth } from "@/src/provider/AuthProvider";
import RemoteImage from "@/src/components/RemoteImage";

const size: PizzaSize[] = ["S", "M", "L", "XL"];

const productDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { session } = useAuth();
  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();
  const router = useRouter();

  const { data: product, isLoading } = useFetchSingleProduct(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage
        style={styles.image}
        path={product?.image}
        fallback={defaultProductImage}
      />

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {size.map((s) => (
          <Pressable
            onPress={() => setSelectedSize(s)}
            key={s}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === s ? "gainsboro" : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize ? "gray" : "white" },
              ]}
            >
              {s}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>{product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: { fontSize: 20, fontWeight: "500" },
});
export default productDetailScreen;
