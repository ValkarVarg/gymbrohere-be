import React, { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Formik } from "formik";
import { fetchUsers, patchUser, postUser } from "../api";
import * as Yup from "yup";
import {} from "@expo-google-fonts/press-start-2p";

export const UserSetup = ({ userId }) => {
  const [userImage, setUserImage] = useState(
    require("../images/boychadprofile1.png")
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUsers(userId)
      .then((response) => {
        if (response) {
          setUser(response);
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, [userId]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const avatar = {
    avatar_body: 1,
    avatar_hair_shape: 1,
    avatar_hair_colour: 1,
    avatar_skin_colour: 1,
    avatar_shirt_colour: 1,
  };

  const stats = {
    complete_workouts: 1,
    experience: 1,
  };

  const handleSubmit = (values) => {
    const transformedValues = {
      birthdate: new Date(values.birthdate),
      height: parseInt(values.height),
      weight: parseInt(values.weight),
      goal: values.goal,
      ...avatar,
      ...stats,
    };
    if (user) {
      patchUser(userId, transformedValues)
        .then((updatedUser) => {
          setUser(updatedUser);
          setModalVisible(true);
        })
        .catch((err) => {});
    } else {
      postUser(userId, transformedValues)
        .then((newUser) => {
          setUser(newUser);
          setModalVisible(true);
        })
        .catch((err) => {
          console.error("Error creating user:", err);
        });
    }
  };

  const validationSchema = Yup.object().shape({
    birthdate: Yup.date()
      .typeError("Birthdate must be a valid date")
      .required("Birthdate is required"),
    height: Yup.number()
      .typeError("Height must be a number")
      .required("Height is required"),
    weight: Yup.number()
      .typeError("Weight must be a number")
      .required("Weight is required"),
    goal: Yup.string()
      .max(100, "Goal must be 100 characters or less")
      .required("Goal is required"),
  });

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          birthdate: user ? user.birthdate : "",
          height: user ? user.height : "",
          weight: user ? user.weight : "",
          goal: user ? user.goal : "",
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={userImage}
                style={styles.image}
                resizeMode="cover"
              />
              <Pressable
                onPress={() =>
                  setUserImage(require("../images/girlchadprofile1.png"))
                }
              >
                <Image
                  source={require("../images/girlchadprofile1.png")}
                  style={styles.smallImage}
                  resizeMode="cover"
                />
              </Pressable>
            </View>
            <Text style={styles.text}>
              {user ? `Hi, ${user.username}!` : "Hi newbie"}
            </Text>
            <Text style={styles.text}>Enter your deets below:</Text>
            <Text></Text>
            <Text style={{ color: "white" }}>Birthdate:</Text>
            <TextInput
              placeholder="  YYYY-MM-DD"
              onChangeText={handleChange("birthdate")}
              onBlur={handleBlur("birthdate")}
              value={values.birthdate}
              style={styles.textInput}
            />
            {touched.birthdate && errors.birthdate && (
              <Text style={styles.errorText}>{errors.birthdate}</Text>
            )}
            <Text style={{ color: "white" }}>Height(cm):</Text>
            <TextInput
              placeholder="  e.g. 190"
              onChangeText={handleChange("height")}
              onBlur={handleBlur("height")}
              value={values.height}
              style={styles.textInput}
            />
            {touched.height && errors.height && (
              <Text style={styles.errorText}>{errors.height}</Text>
            )}
            <Text style={{ color: "white" }}>Weight(kg):</Text>
            <TextInput
              placeholder="  e.g. 100"
              onChangeText={handleChange("weight")}
              onBlur={handleBlur("weight")}
              value={values.weight}
              style={styles.textInput}
            />
            {touched.weight && errors.weight && (
              <Text style={styles.errorText}>{errors.weight}</Text>
            )}
            <Text style={{ color: "white" }}>Goal:</Text>
            <TextInput
              placeholder="  e.g. get big"
              onChangeText={handleChange("goal")}
              onBlur={handleBlur("goal")}
              value={values.goal}
              style={styles.textInput}
            />
            {touched.goal && errors.goal && (
              <Text style={styles.errorText}>{errors.goal}</Text>
            )}
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "lightgreen" : "#393F62",
                  borderWidth: 4,
                  borderColor: "#000",
                  borderRadius: 20,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  alignItems: "center",
                  flexDirection: "row-reverse",
                  justifyContent: "center",
                },
                styles.pixelButton,
              ]}
              onPress={handleSubmit}
            >
              <Image
                source={require("../images/buffarm.png")}
                style={styles.buttonIcon}
                resizeMode="contain"
              />
              <Text style={styles.pixelButtonText}>
                {user ? "Edit Deets" : "Get Big"}
              </Text>
            </Pressable>
            <Modal isVisible={isModalVisible}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Cool! Check out your new gym space!
                </Text>
                <Pressable onPress={closeModal}>
                  <Text style={styles.modalButton}>Close</Text>
                </Pressable>
              </View>
            </Modal>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101D2D",
    flex: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginLeft: 70,
  },
  smallImage: {
    width: 50,
    height: 50,
    marginTop: 10,
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
    color: "#69C56D",
    fontFamily: "Pixelify_Sans",
  },
  textInput: {
    height: 40,
    borderColor: "black",
    backgroundColor: "#69C56D",
    borderWidth: 4,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  pixelButton: {
    borderRadius: 0,
    backgroundColor: "#69C56D",
    borderWidth: 4,
    borderColor: "#000",
  },
  button: {
    marginTop: 20,
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  pixelButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    fontSize: 16,
    color: "blue",
  },
});
