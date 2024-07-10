import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Switch } from "react-native";

export const AccountSettings = ({ navigation, userId }) => {
  const [pushIsOn, setPushIsOn] = useState(false);
  const [AreYouSureIsOn, setAreYouSureIsOn] = useState(false);
  const [viewDelete, setViewDelete] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const togglePushSwitch = () => {
    setPushIsOn((currentState) => !currentState);
    //need to add push functionlity here
  };
  const toggleSureSwitch = () => {
    setAreYouSureIsOn((currentState) => !currentState);
  };
  const seeDeleteOptions = () => {
    setViewDelete((currentState) => !currentState);
  };
  const handleDeleteSubmit = () => {
    if (AreYouSureIsOn === true) {
      setDeleteMessage("profile is being deleted...");
      console.log(userId);
      //add delete request here! - use user ID, .then nav to landing page
      navigation.navigate("LandingPage");
    } else {
      setDeleteMessage("please check are you sure!");
    }
  };

  return (
    <View>
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionHeadingText}>Notification Settings</Text>
      </View>
      <View style={styles.swipeSection}>
        <Text style={styles.switchText}>Enable Push Notifications? </Text>
        <Switch
          trackColor={{ false: "grey", true: "#06ac68" }}
          onValueChange={togglePushSwitch}
          value={pushIsOn}
          thumbColor={pushIsOn ? "#14a174" : "#f4f3f4"}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionHeadingText}>Your data</Text>
      </View>
      <View>
        <Pressable onPress={seeDeleteOptions} style={styles.button}>
          <Text
            style={{
              color: "white",
            }}
          >
            DELETE PROFILE{" "}
          </Text>
        </Pressable>
      </View>
      {viewDelete ? (
        <View>
          <View style={styles.swipeSection}>
            <Text style={styles.switchText}>Are You Sure?</Text>
            <Switch
              trackColor={{ false: "grey", true: "#06ac68" }}
              onValueChange={toggleSureSwitch}
              value={AreYouSureIsOn}
              thumbColor={AreYouSureIsOn ? "#14a174" : "#f4f3f4"}
            />
          </View>
          <Text>{deleteMessage}</Text>
          <Pressable style={styles.button} onPress={handleDeleteSubmit}>
            <Text>DELETE</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
      <Separator />
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionHeadingText}>Terms and conditions</Text>
        <Text
          style={{
            color: "white",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
          obcaecati voluptates! Magni possimus adipisci consequuntur officia
          officiis, cupiditate optio sequi iure nostrum ducimus perspiciatis cum
          aperiam quisquam hic voluptate id.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeSection: {
    flexDirection: "row",
    gap: 10,
  },
  switchText: {
    padding: 20,
    color: "white",
  },
  sectionHeading: {
    marginVertical: 16,
    color: "white",
  },
  sectionHeadingText: {
    textTransform: "uppercase",
    color: "white",
  },
  button: {
    alignItems: "center",
    alignSelf: "flex-start",
    padding: 5,
    margin: 10,
    backgroundColor: "red",
    borderWidth: 4,
    borderColor: "#000",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
