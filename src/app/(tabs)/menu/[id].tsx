import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const productDetailScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: "Details"}} />
    </View>
  );
};

export default productDetailScreen;
