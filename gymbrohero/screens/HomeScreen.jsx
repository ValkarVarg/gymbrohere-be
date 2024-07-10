import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, ImageBackground } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { LevelUp } from "../components/LevelUp";
import { gridToAbsolutePosition } from "../components/GridConversion";
import { fetchUserItems } from "../api";
import blackcat from "../assets/items/blackcat.png";
import bunny from "../assets/items/bunny.png";
import lizard from "../assets/items/lizard.png";
import pup1 from "../assets/items/pup1.png";
import pup2 from "../assets/items/pup2.png";
import tabbycat from "../assets/items/tabbycat.png";

const imageMap = {
  blackcat: blackcat,
  bunny: bunny,
  lizard: lizard,
  pup1: pup1,
  pup2: pup2,
  tabbycat: tabbycat,
};

const HomeScreen = ({ navigation, userId }) => {
  const [userItems, setUserItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchItems = async () => {
        try {
          if (!userId) return;
          const items = await fetchUserItems(userId);
          setUserItems(items);
        } catch (error) {
          console.error("Error fetching user items:", error);
        }
      };

      fetchItems();
    }, [userId]) 
  );

  const renderItemWithPosition = (item) => {
    const itemImage = imageMap[item.item_img];
    const { x, y } = gridToAbsolutePosition(item.display_location, 400, 4);
    const adjustedX = x + 20;
    const adjustedY = y - 10;
    return (
      <View key={item.user_item_row_id} style={[styles.itemContainer, { left: adjustedX, top: adjustedY }]}>
        <Image source={itemImage} style={styles.itemImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/background.jpg")}
        style={styles.backgroundImage}
      >
        <LevelUp />
        <View style={styles.centeredContainer}>
          <Image
            source={require("../images/girlchadstill.png")}
            style={styles.heroImage}
          />
        </View>

        {userItems.map((item) => renderItemWithPosition(item))}

        <Pressable
          onPress={() => navigation.navigate("StoreFront")}
          style={styles.storeButtonWrapper}
        >
          <Image
            source={require("../images/storefront.png")}
            style={styles.storeButton}
          />
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    position: "absolute",
    bottom: 50,
    right: 40,
  },
  homeText: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
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
  itemContainer: {
    position: "absolute",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default HomeScreen;
