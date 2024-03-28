import { Stack, useLocalSearchParams } from "expo-router";
import { Image, Text, View, Pressable, StyleSheet } from "react-native";
import products from "@/assets/data/products";
import { useState } from "react";
import { defaultProductImage } from "@/src/components/ProductListItem";
import Button from "@/src/components/Button";

const size = ["S", "M", "L", "XL"];

const productDetailScreen = () => {
  const [selectedSize, setSelectedSize] = useState("M");

  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    console.warn("Adding to cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        style={styles.image}
        source={{ uri: product.image || defaultProductImage }}
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
