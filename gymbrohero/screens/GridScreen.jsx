import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, ImageBackground } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const GridScreen = () => {
  return (
    <ImageBackground
      source={require("../images/background.jpg")} 
      style={styles.imageBackground}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {[...Array(28)].map((_, index) => (
            <Text key={index} style={styles.tile}></Text>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover", 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: screenWidth,
    padding: 0,
  },
  tile: {
    width: screenWidth / 4 - 20, 
    height: screenWidth / 4 - 20, 
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C9B192",
    margin: 10,
  },
});
