import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';

export const CreateSet = (props) => {
  const initialValues = {
    friends: [
      {
        ...props.props.ExerciseBlock[0],
        setId: '1',
        workouReps: '',
        workoutWeight: '',
      },
    ],
  };

  return (
    <SafeAreaView>
      <Text>in create set!</Text>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <View>
            <FieldArray name="friends">
              {(arrayHelpers) => (
                <View>
                  {values.friends.map((friend, index) => (
                    <View key={index}>
                      <Text>
                        set {index + 1}
                      </Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange(`friends[${index}].workouReps`)}
                        onBlur={handleBlur(`friends[${index}].workouReps`)}
                        value={friend.workouReps}
                        placeholder="reps"
                      />
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange(`friends[${index}].workoutWeight`)}
                        onBlur={handleBlur(`friends[${index}].workoutWeight`)}
                        value={friend.weight}
                        placeholder="workoutWeight"
                      />
                      <Button
                        title="remove set"
                        onPress={() => {
                          arrayHelpers.remove(index);
                        }}
                      />
                    </View>
                  ))}
                  <Button
                    title="Add Set"
                    onPress={() => {
                      arrayHelpers.push({
                        orderId: '1',
                        exerciseId: '', 
                        setId: `${(values.friends.length) + 1}`,
                        workouReps: '',
                        workoutWeight: '',
                      });
                    }}
                  />
                </View>
              )}
            </FieldArray>
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  friendContainer: {
    marginBottom: 20,
  },
});
