import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";


const testItems = [
  { id: "1", source: require("../images/Bro.png"), isUnlocked: true },
  { id: "2", source: require("../images/Brodarkhair.png"), isUnlocked: true },
  { id: "3", source: require("../images/storefront.png"), isUnlocked: true },
];

export const StoreFront = () => {
  const [allItems, setAllItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setAllItems(testItems);
  }, []);

  if (!allItems) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const unlockedItems = allItems.filter((item) => item.isUnlocked);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    navigation.navigate("GridScreen", { selectedImage: item.source });
  };

  const renderItem = ({ item }) => {
    const isSelected = item === selectedItem;
    const itemStyle = [
      styles.item,
      !item.isUnlocked && styles.itemLocked,
      isSelected && styles.itemSelected,
    ];

    return (
      <Pressable onPress={() => handleItemPress(item)}>
        <View style={itemStyle}>
          <Image source={item.source} style={styles.itemImage} />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={unlockedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.header}>Store Front</Text>}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
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