import { supabase } from "@/src/lib/supabase";
import { View, Text, Button } from "react-native";

const profile = () => {
  return (
    <View>
      <Text>profile</Text>
      <Button
        title="Sign-out"
        onPress={async () => await supabase.auth.signOut}
      ></Button>
    </View>
  );
};

export default profile;
