import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { LevelUp } from "../components/LevelUp";

export default function HomeScreen({ navigation }) {
  const [closedLevelUp, setClosedLevelUp] = useState(false); //will need to set this state based on xp bar - requires get request

  return (
    <View style={styles.container}>
      {closedLevelUp ? (
        <Text>This is the Home Screen</Text>
      ) : (
        <LevelUp
          closedLevelUp={closedLevelUp}
          setClosedLevelUp={setClosedLevelUp}
        />
      )}
      <Pressable
        onPress={() => navigation.navigate("StoreFront")}
        style={styles.storeButtonWrapper}
      >
        <Image
          source={require("../images/storefront.png")}
          style={styles.storeButton}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  storeButton: {
    width: 50,
    height: 50,
  },
  storeButtonWrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
