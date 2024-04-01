import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { supabase } from "@/src/lib/supabase";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    setError("");
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!password) {
      setError("Price is required");
      return false;
    }
    return true;
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>username</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        style={styles.input}
        secureTextEntry
      />

      <Text style={[{ color: "red" }]}>{error}</Text>
      <Button
        onPress={signUpWithEmail}
        text={loading ? "Signing Up..." : "Sign Up"}
        style={styles.textButton}
        disabled={loading}
      />
      <Link href="/sign-in">Sign-in</Link>
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

  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
export default RegisterPage;
