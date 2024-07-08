import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

export const GridScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.grid}>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
        <Text style={styles.tile}></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: screenWidth,
  },
  tile: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C9B192",
  },
});
