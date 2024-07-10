import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useExperience } from "../components/XpContext";
import { fetchItems } from "../api";
import blackcat from "../assets/items/blackcat.png";
import bunny from "../assets/items/bunny.png";
import lizard from "../assets/items/lizard.png";
import pup1 from "../assets/items/pup1.png";
import pup2 from "../assets/items/pup2.png";
import tabbycat from "../assets/items/tabbycat.png";
import Toast from "react-native-toast-message";

const imageMap = {
  blackcat: blackcat,
  bunny: bunny,
  lizard: lizard,
  pup1: pup1,
  pup2: pup2,
  tabbycat: tabbycat,
};

export const StoreFront = ({ userId }) => {
  const [allItems, setAllItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [unlockedItems, setUnlockedItems] = useState(null);
  const navigation = useNavigation();
  const { currentExperience } = useExperience();
  const toastRef = useRef(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const items = await fetchItems();
        setAllItems(items);
        const newUnlockedItems = items.filter(
          (item) => currentExperience >= item.level_available
        );
        setUnlockedItems(newUnlockedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    getItems();
  }, []);

  if (!allItems || !unlockedItems) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleItemPress = (item) => {
    const isUnlocked = unlockedItems.includes(item);
    if (isUnlocked) {
      setSelectedItem(item);
      navigation.navigate("GridScreen", {
        selectedImage: item,
        userId: userId,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Locked Item",
        text2: "You need to be more buff to unlock this!",
      });
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = item === selectedItem;
    const isUnlocked = unlockedItems.includes(item);
    const itemStyle = [
      styles.item,
      !isUnlocked && styles.itemLocked,
      isSelected && styles.itemSelected,
    ];

    const itemImage = imageMap[item.item_img];

    return (
      <Pressable onPress={() => handleItemPress(item)}>
        <View style={itemStyle}>
          <Image source={itemImage} style={styles.itemImage} />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.item_id.toString()}
        ListHeaderComponent={<Text style={styles.header}>- Cool Stuff -</Text>}
        numColumns={3}
      />
      <Toast
        ref={toastRef}
        config={{
          error: ({ text1, text2, props, ...otherProps }) => (
            <View style={{ backgroundColor: "red", padding: 10 }}>
              <Text style={{ color: "white" }}>{text1}</Text>
              <Text style={{ color: "white", marginTop: 5 }}>{text2}</Text>
            </View>
          ),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101D2D",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "pixelify-bold",
    color: "#69C56D",
  },
  item: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  itemLocked: {
    opacity: 0.5,
  },
  itemSelected: {
    borderColor: "blue",
  },
  itemImage: {
    width: 95,
    height: 95,
  },
});
