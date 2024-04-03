import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Text,
  View,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { defaultProductImage } from "@/src/components/ProductListItem";
import { useCart } from "@/src/provider/CartProvider";
import { PizzaSize } from "@/src/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { useFetchSingleProduct } from "@/src/api/ProductApi";
import RemoteImage from "@/src/components/RemoteImage";

const size: PizzaSize[] = ["S", "M", "L", "XL"];

const productDetailScreen = () => {
  const { addItem } = useCart();

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, isLoading } = useFetchSingleProduct(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage
        style={styles.image}
        path={product?.image}
        fallback={defaultProductImage}
      />

      <Text>Select size</Text>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      {/* <Button onPress={addToCart} text="Add to cart" /> */}
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
  },
  title: {
    fontSize: 20,
  },
});
export default productDetailScreen;
