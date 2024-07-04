import React from "react";
import { View, Text } from "react-native";
import { UserSetup } from "../components/UserSetup";

export const SettingsScreen = () => {
  return (
    <View>
      <Text>This is the Settings Screen</Text>
      <UserSetup />
    </View>
  );
};
