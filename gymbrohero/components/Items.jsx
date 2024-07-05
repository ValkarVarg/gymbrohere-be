import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export const Items = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={item.source} style={styles.image} />
    <Text>{item.id}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {},
  itemContainer: {},
  image: {},
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 5,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
  },
});
