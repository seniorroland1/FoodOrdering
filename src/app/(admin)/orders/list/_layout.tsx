import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

// install materialtoptab navigator

const TopTabs = withLayoutContext(createMaterialTopTabNavigator);
export default function OrderListNavigator() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <TopTabs>
        <TopTabs.Screen name="indec=x" options={{ title: "Active" }} />
      </TopTabs>
    </SafeAreaView>
  );
}
