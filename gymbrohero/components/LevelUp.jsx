import { View, Text, Image, StyleSheet, Pressable, Modal } from "react-native";
import { useExperience } from "./XpContext";

export const LevelUp = () => {
  const { levelUpVisible, closeLevelUp } = useExperience();

  return (
    <Modal
      transparent={true}
      visible={levelUpVisible}
      onRequestClose={closeLevelUp}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.button}>
            <Pressable onPress={closeLevelUp}>
              <Text>x</Text>
            </Pressable>
          </View>
          <Image
            source={require("../images/ladychad.gif")}
            style={styles.image}
            resizeMode="cover"
          ></Image>
          <Text style={styles.text}>You Levelled up bro!</Text>
          <Text style={styles.subtext}>New Items unlocked in store</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  box: {
    borderRadius: 15,
    borderWidth: 4,
    borderStyle: "dashed",
    borderColor: "#69C56D",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#69C56D",
    margin: 30,
    marginTop: 100,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    color: "black",
    fontFamily: "pixelify-bold",
  },
  subtext: {
    marginTop: 20,
    fontSize: 18,
    color: "black",
    fontFamily: "pixelify-bold",
  },
  button: {
    position: "absolute",
    padding: 15,
    top: 0,
    right: 0,
    backgroundColor: "grey",
    borderRadius: 10,
  },
});
