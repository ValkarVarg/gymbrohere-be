import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ImageBackground } from "react-native";
import { LevelUp } from "../components/LevelUp";

export default function HomeScreen({ navigation }) {


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/background.jpg")} 
        style={styles.backgroundImage}
      >
          <LevelUp/>
        <View style={styles.centeredContainer}>
          <Image
            source={require("../images/hero.png")}
            style={styles.heroImage}
          />
        </View>

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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    position: "absolute",
    bottom: 50,
    right: 0,
  },
  homeText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff', 
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
