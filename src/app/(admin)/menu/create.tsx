import Button from "@/src/components/Button";
import { defaultProductImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "@/src/api/ProductApi";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/src/lib/supabase";

const CreateProductScreen = () => {
  const router = useRouter();

  const [name, setName] = useState<string>();
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const {
    createProduct,
    isLoading: isCreateProductLoading,
    isSuccess: isCreatingSuccess,
  } = useCreateProduct();
  const {
    updateProduct,
    isLoading: isUpdateProductLoading,
    isSuccess: isUpdateSuccess,
  } = useUpdateProduct(id);
  const {
    deleteProduct,
    isLoading: isDeleteProductLoading,
    isSuccess: isDeleteSuccess,
  } = useDeleteProduct(id);

  const isUpdating = !!id;

  const validateInput = () => {
    setError("");
    if (!name) {
      setError("Name is required");
      return false;
    }
    if (!price) {
      setError("Price is required");
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setError("Price must be a number");
      return false;
    }
    return true;
  };

  if (
    isCreateProductLoading ||
    isUpdateProductLoading ||
    isDeleteProductLoading
  ) {
    return <ActivityIndicator />;
  }

  const onUpdate = async () => {
    const imagePath = await uploadImage();
    updateProduct({ name, price: parseFloat(price), image: imagePath });
  };

  const onCreate = async () => {
    const imagePath = await uploadImage();
    createProduct({
      name,
      price: parseFloat(price),
      image: imagePath,
    });
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const handleBtnClick = () => {
    if (!validateInput) {
      return;
    }
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onDelete = () => {
    deleteProduct();
    router.back();
  };

  const deleteProduct = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product ?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  if (isCreatingSuccess | isUpdateSuccess | isDeleteSuccess) {
    resetFields();
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  // install expo-file-system base64-arraybuffer
  // import * as FileSystem from 'expo-file-system'

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-image")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Updating Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image || defaultProductImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="name"
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={{ color: "red" }}>{error}</Text>
      <Button
        text={isUpdating ? "Update" : "Create"}
        onPress={handleBtnClick}
      />
      {isUpdating && (
        <Button
          text="Delete"
          style={[styles.textButton, { backgroundColor: "red" }]}
          onPress={deleteProduct}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: { color: "gray", fontSize: 16 },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
export default CreateProductScreen;
