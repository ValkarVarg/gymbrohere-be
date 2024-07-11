import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable, ImageBackground, Alert, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; 
import { fetchUserItems, patchUserItem, postUserItem } from "../api";

const { width: screenWidth } = Dimensions.get("window");

export const GridScreen = ({ userId }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedImage } = route.params; 
  const [grid, setGrid] = useState(Array(28).fill(null));
  const [selectedSpot, setSelectedSpot] = useState(null);


  useEffect(() => {
    const loadUserItems = async () => {
      try {
        const items = await fetchUserItems(userId);
        updateGridWithUserItems(items);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };

    loadUserItems();
  }, [userId]);

  const updateGridWithUserItems = (items) => {
    const newGrid = Array(28).fill(null);
    items.forEach(item => {
      const index = getGridIndexFromReference(item.display_location);
      if (index !== -1) {
        newGrid[index] = item;
      }
    });
    setGrid(newGrid);
  };

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
      handlePlaceImage(index);
    }
  };

  const handlePlaceImage = async (index) => {
    try {
      const display_location = getGridReference(index);
      await postUserItem(userId, {display_location, item_id: selectedImage.item_id });
      const newGrid = [...grid];
      newGrid[index] = { userId, display_location, item_img: selectedImage.item_img };
      setGrid(newGrid);
      setSelectedSpot(null);
      navigation.navigate('Main'); 
    } catch (error) {
      console.error("Error placing image:", error);
    }
  };

  const handleReplaceImage = async (index) => {
    try {
      const user_item_row_id = grid[index].user_item_row_id;
      const display_location = getGridReference(index);
      await patchUserItem({user_item_row_id, userId, display_location, item_id: selectedImage.item_id });
      const newGrid = [...grid];
      newGrid[index] = { userId, display_location, item_img: selectedImage.item_img };
      setGrid(newGrid);
      setSelectedSpot(null);
      navigation.navigate('Main'); 
    } catch (error) {
      console.error("Error replacing image:", error);
    }
  };

  const getGridIndexFromReference = (display_location) => {
    if (!display_location || typeof display_location !== 'string') return -1;

    const row = display_location.charCodeAt(0) - 65; 
    const col = parseInt(display_location.charAt(1), 10) - 1;
    if (isNaN(row) || row < 0 || row >= 7 || isNaN(col) || col < 0 || col >= 4) return -1; 
    return row * 4 + col;
  };

  const renderGrid = () => {
    return grid.map((item, index) => (
      <Pressable
        key={index}
        style={[styles.tile, item && styles.tileWithImage]}
        onPress={() => handleSpotPress(index)}
        activeOpacity={0.8}
      >
        {item && <Image source={getImageSource(item.item_img)} style={styles.itemImage} />}
        {!item && selectedSpot === index && <Image source={getImageSource(selectedImage.item_img)} style={styles.itemImage} />}
        {item && <Text style={styles.gridText}>{item.display_location}</Text>}
      </Pressable>
    ));
  };

  const getImageSource = (item_img) => {
    switch (item_img) {
      case "blackcat":
        return require("../assets/items/blackcat.png");
      case "bunny":
        return require("../assets/items/bunny.png");
      case "lizard":
        return require("../assets/items/lizard.png");
      case "pup1":
        return require("../assets/items/pup1.png");
      case "pup2":
        return require("../assets/items/pup2.png");
      case "tabbycat":
        return require("../assets/items/tabbycat.png");
      default:
        return null;
    }
  };

  const getGridReference = (index) => {
    const row = String.fromCharCode(65 + Math.floor(index / 4));
    const col = (index % 4) + 1;
    return `${row}${col}`;
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
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default GridScreen;
