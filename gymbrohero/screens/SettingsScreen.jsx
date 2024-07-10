import React, { useState } from "react";
import { View, Text } from "react-native";
import { UserSetup } from "../components/UserSetup";
import { AccountSettings } from "../components/AccountSettings";
import { StyleSheet, Pressable } from "react-native";

export const SettingsScreen = ({ navigation, userId }) => {
  const [accountSettingsView, setAccountSettingsView] = useState(true);

  const accountClick = () => {
    setAccountSettingsView(true);
  };
  const profileClick = () => {
    setAccountSettingsView(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixToText}>
        <Pressable
          onPress={accountClick}
          style={[
            styles.button,
            accountSettingsView ? styles.activeButton : styles.inactiveButton,
          ]}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "pixelify-regular",
            }}
          >
            account settings
          </Text>
        </Pressable>
        <Pressable
          onPress={profileClick}
          style={[
            styles.button,
            accountSettingsView ? styles.inactiveButton : styles.activeButton,
          ]}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "pixelify-regular",
            }}
          >
            profile settings
          </Text>
        </Pressable>
      </View>
      {accountSettingsView ? (
        <AccountSettings navigation={navigation} userId={userId} />
      ) : (
        <UserSetup userId={userId} />
      )}
    </View>
  );
};

export const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101D2D",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 4,
    borderColor: "#000",
    backgroundColor: "#393F62",
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: "#69C56D",
  },
  inactiveButton: {
    backgroundColor: "#69C56D",
  },
  greenText: {
    color: "#69C56D",
  },
  regularText: {
    fontFamily: "pixelify-regular",
  },
  semiboldText: {
    fontFamily: "pixelify-semibold",
  },
  boldText: {
    fontFamily: "pixelify-bold",
  },
});
