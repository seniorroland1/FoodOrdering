import { View, Text, Image, StyleSheet } from "react-native";
import { CartItem } from "../types";
import { defaultProductImage } from "./ProductListItem";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../provider/CartProvider";

type CartListItemProps = {
  cartItem: CartItem;
};
const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useCart();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: cartItem.product.image || defaultProductImage }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            $ {cartItem.product.price.toFixed(2)}
          </Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />
        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {},
  subtitleContainer: {},
  price: {},
  size: {},
  quantitySelector: {},
  quantity: {},
});
export default CartListItem;
