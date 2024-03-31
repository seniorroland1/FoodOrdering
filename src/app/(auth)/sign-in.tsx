import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();

  const validateInput = () => {
    setError("");
    if (!username) {
      setError("Name is required");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const login = () => {
    validateInput();
    return <Redirect href={"/(user)/menu/"} />;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
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
      <Button onPress={login} text="Login" style={styles.textButton} />
      <Link href="/sign-up">Sign-up</Link>
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
export default LoginPage;
