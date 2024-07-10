import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const ProfileScreen = () => {
  const [user, setUser] = useState({
    username: "",
    height: "",
    weight: "",
    age: "",
    goal: "",
  });

  useEffect(() => {
    setUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/Bro.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.text}>Name: {user.username}</Text>
      <Text style={styles.text}>Height: {user.height}</Text>
      <Text style={styles.text}>Weight: {user.weight}</Text>
      <Text style={styles.text}>Age: {user.age}</Text>
      <Text style={styles.text}>Goal: {user.goal}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#101D2D",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
});
