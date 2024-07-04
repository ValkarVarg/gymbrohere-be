import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Formik } from "formik";

export const UserSetup = () => {
  const [userImage, setUserImage] = useState("../images/Bro.png");

  return (
    <Formik
      initialValues={{
        name: "",
        birthday: "",
        height: "",
        weight: "",
        goal: "",
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={{ padding: 20 }}>
          <View style={styles.imageContainer}>
            <Image source={userImage} style={styles.image} resizeMode="cover" />
            <Pressable
              onPress={() => setUserImage(require("../images/Brodarkhair.png"))}
            >
              <Image
                source={require("../images/Brodarkhair.png")}
                style={styles.smallImage}
                resizeMode="cover"
              />
            </Pressable>
          </View>
          <Text style={styles.text}>Enter your deets below:</Text>
          <Text>Name:</Text>
          <TextInput
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            style={styles.textInput}
          />
          <Text>Birthday:</Text>
          <TextInput
            onChangeText={handleChange("birthday")}
            onBlur={handleBlur("birthday")}
            value={values.birthday}
            style={styles.textInput}
          />
          <Text>Height:</Text>
          <TextInput
            onChangeText={handleChange("height")}
            onBlur={handleBlur("height")}
            value={values.height}
            style={styles.textInput}
          />
          <Text>Weight:</Text>
          <TextInput
            onChangeText={handleChange("weight")}
            onBlur={handleBlur("weight")}
            value={values.weight}
            style={styles.textInput}
          />
          <Text>Goal:</Text>
          <TextInput
            onChangeText={handleChange("goal")}
            onBlur={handleBlur("goal")}
            value={values.goal}
            style={styles.textInput}
          />
          <Button onPress={handleSubmit} title="Get Big" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginLeft: 70,
  },
  smallImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
});
