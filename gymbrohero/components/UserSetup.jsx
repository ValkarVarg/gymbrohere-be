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

  // const stats = {
  //   complete_workouts: 0,
  //   experience: 0,
  // };

  const handleSubmit = (values) => {
    const transformedValues = {
      birthdate: new Date(values.birthdate),
      height: parseInt(values.height),
      weight: parseInt(values.weight),
      goal: values.goal,
      ...avatar,
      // ...stats,
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
            <Text style={[styles.header, styles.boldText, styles.greenText]}>
              {user ? `Hi, ${user.username}!` : "Hi newbie"}
            </Text>
            <Text style={[styles.header, styles.boldText, styles.greenText]}>
              Enter your deets below:
            </Text>
            <Text></Text>
            <Text style={[styles.regularText, styles.greenText]}>
              Birthdate:
            </Text>
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
            <Text style={[styles.regularText, styles.greenText]}>
              Height(cm):
            </Text>
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
            <Text style={[styles.regularText, styles.greenText]}>
              Weight(kg):
            </Text>
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
            <Text style={[styles.regularText, styles.greenText]}>Goal:</Text>
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
              <Text style={styles.pixelButtonText}>
                {user ? "Edit Deets" : "Get Big"}
              </Text>
            </Pressable>
            <Modal isVisible={isModalVisible}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Cool, now go get big!</Text>
                <Pressable onPress={closeModal}>
                  <Text style={styles.modalButton}>close</Text>
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
  header: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 15,
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
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  greenText: {
    color: "#69C56D",
  },
  regularText: {
    fontFamily: "pixelify-regular",
  },
  semiboldText: {
    fontFamily: "pixelify-semibold",
  },
  boldText: {
    fontFamily: "pixelify-bold",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  pixelButton: {
    borderRadius: 5,
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
    color: "black",
    fontSize: 18,
    fontFamily: "pixelify-semibold",
  },
  modalContent: {
    backgroundColor: "#69C56D",
    padding: 20,
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 4,
    borderStyle: "dashed",
    borderColor: "#69C56D",
  },
  modalText: {
    fontFamily: "pixelify-semibold",
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    fontSize: 16,
    color: "black",
    fontFamily: "pixelify-regular",
  },
});
