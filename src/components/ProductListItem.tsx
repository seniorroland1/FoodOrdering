import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "@/src/constants/Colors";
type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type Props = {
  product: Product;
};
const ProductListItem = ({ product }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
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
