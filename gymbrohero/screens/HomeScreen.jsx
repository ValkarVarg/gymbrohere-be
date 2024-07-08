import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ImageBackground } from "react-native";
import { LevelUp } from "../components/LevelUp";

export default function HomeScreen({ navigation }) {
  const [closedLevelUp, setClosedLevelUp] = useState(false); //will need to set this state based on xp bar - requires get request

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/background.jpg")} 
        style={styles.backgroundImage}
      >
        {/* {closedLevelUp ? (
          <Text style={styles.homeText}>This is the Home Screen</Text>
        ) : (
          <LevelUp
            closedLevelUp={closedLevelUp}
            setClosedLevelUp={setClosedLevelUp}
          />
        )} */}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  homeText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff', // Adjust text color based on background image
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
});
