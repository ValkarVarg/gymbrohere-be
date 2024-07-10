import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable, ImageBackground, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { postUserItem, patchUserItem } from "../api";

const { width: screenWidth } = Dimensions.get("window");

export const GridScreen = ({ selectedImage }) => {
  const navigation = useNavigation();
  const [grid, setGrid] = useState(Array(28).fill(null));
  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleSpotPress = (index) => {
    if (grid[index]) {
      Alert.alert(
        "Replace Image",
        "Are you sure you want to replace the existing image?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Replace", onPress: () => handleReplaceImage(index) },
        ]
      );
    } else {
      setSelectedSpot(index);
    }
  };

  const handleReplaceImage = async (index) => {
    try {
      await patchUserItem({ gridReference: getGridReference(index), image: selectedImage.item_img /* pass image information here */ });
      const newGrid = [...grid];
      newGrid[index] = null /* pass image information here */;
      setGrid(newGrid);
    } catch (error) {
      console.error("Error replacing image:", error);
    }
  };

  const getGridReference = (index) => {
    const row = String.fromCharCode(65 + Math.floor(index / 4));
    const col = (index % 4) + 1;
    return `${row}${col}`;
  };

  const renderGrid = () => {
    return grid.map((item, index) => (
      <Pressable
        key={index}
        style={[styles.tile, item && styles.tileWithImage]}
        onPress={() => handleSpotPress(index)}
        activeOpacity={0.8}
      >
        {item && <Text style={styles.gridText}>{getGridReference(index)}</Text>}
      </Pressable>
    ));
  };

  return (
    <ImageBackground
      source={require("../images/background.jpg")}
      style={styles.imageBackground}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gridContainer}>{renderGrid()}</View>
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: screenWidth,
    padding: 10,
  },
  tile: {
    width: screenWidth / 4 - 25,
    height: screenWidth / 4 - 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C9B192",
    margin: 10,
    backgroundColor: 'transparent',
  },
  tileWithImage: {
    backgroundColor: "#F4A261",
  },
  gridText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GridScreen;
