import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "@/src/constants/Colors";
import { Product } from "../types";

export const defaultProductImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.pnghttps://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type Props = {
  product: Product;
};
const ProductListItem = ({ product }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultProductImage }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
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
