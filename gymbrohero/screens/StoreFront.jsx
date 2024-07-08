import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { Items } from "../components/Items";
import { GridScreen } from "./GridScreen";

const testItems = [
  { id: "1", source: require("../images/Bro.png"), isUnlocked: true },
  { id: "2", source: require("../images/Brodarkhair.png"), isUnlocked: true },
  { id: "3", source: require("../images/storefront.png"), isUnlocked: true },
];

export const StoreFront = () => {
  const [allItems, setAllItems] = useState(null);

  useEffect(() => {
    setAllItems(testItems);
  }, []);

  if (!allItems) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const unlockedItems = allItems.filter((item) => item.isUnlocked);

  const availableItems = unlockedItems.map((item) => (
    <Items key={item.id} item={item} />
  ));
  // ScrollView will need to be removed once the grid is relocated
  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <FlatList
            data={availableItems}
            renderItem={({ item }) => item}
            keyExtractor={(item) => item.id}
          />
        </View>
        <GridScreen />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  itemContainer: {},
});
