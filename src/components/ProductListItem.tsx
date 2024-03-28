import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Colors from "@/src/constants/Colors";
import { Product } from "../types";
import { Link } from "expo-router";

export const defaultProductImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.pnghttps://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type Props = {
  product: Product;
};
const ProductListItem = ({ product }: Props) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultProductImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default ProductListItem;
