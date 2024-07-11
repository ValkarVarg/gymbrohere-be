import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { fetchUsers } from "../api";

export const ProfileScreen = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUsers(userId)
      .then((user) => setUser(user))
      .catch((err) => {
        alert("you need to create an account bro!");
        setUser(null);
      });
  }, [userId]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.profileLoading}>Go make a profile bro...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>- Check yourself out, bro! -</Text>
      <Image
        source={require("../images/girlchadprofile1.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.text}>Name: {user.username}</Text>
      <Text style={styles.text}>Height: {user.height}</Text>
      <Text style={styles.text}>Weight: {user.weight}</Text>
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
  profileLoading: {
    fontFamily: "pixelify-semibold",
    color: "#69C56D",
  },
  text: {
    marginTop: 20,
    fontSize: 23,
    fontFamily: "pixelify-semibold",
    color: "#69C56D",
  },
  headerText: {
    marginTop: 20,
    fontSize: 26,
    fontFamily: "pixelify-bold",
    color: "#69C56D",
    paddingBottom: 15,
  },
});
