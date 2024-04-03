import { Image, Text, View, StyleSheet, FlatList } from "react-native";
import { defaultProductImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { CartItem } from "../types";
import RemoteImage from "./RemoteImage";

type Props = {
  item: CartItem;
};
const OrderItemListItem = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <RemoteImage
        style={styles.image}
        path={item.product.image}
        fallback={defaultProductImage}
        resizeMode="contain"
      />

      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text>{item.product.name}</Text>
          <View>
            <Text style={styles.price}>{item.product.price}</Text>
            <Text style={styles.size}>{item.size}</Text>
          </View>
        </View>

        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    flexDirection: "row",
    rowGap: 2,
  },
  infoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    rowGap: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  image: {
    width: 30,
    aspectRatio: 1,
  },
  quantity: {
    fontWeight: "bold",
  },
  size: {
    fontWeight: "bold",
  },
});
export default OrderItemListItem;
