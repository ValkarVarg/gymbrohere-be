import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/Bro.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.text}>Name: {"Chad"}</Text>
      <Text style={styles.text}>Height: {"190cm"}</Text>
      <Text style={styles.text}>Weight: {"100Kg"}</Text>
      <Text style={styles.text}>Age: {"40"}</Text>
      <Text style={styles.text}>Net Worth: {"£140 mill"}</Text>
      <Text style={styles.text}>Goal: {"Get swole for the ladies"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
});
