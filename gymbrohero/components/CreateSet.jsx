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
  console.log(props.exerciseObject.exerciseId, 'exercise obj in create set')
  const initialValues = {
    friends: [
      {
        exerciseId: props.exerciseObject.exerciseId,
        setId: '1',
        workoutReps: '',
        workoutWeight: '',
      },
    ],
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2))
          props.setnewIndividualWorkout(values)
          console.log(values, 'new workout exercise');
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <View>
            <FieldArray name="friends">
              {(arrayHelpers) => (
                <View>
                  {values.friends.map((friend, index) => (
                    <View key={index} style={styles.row}>
                      <Text>
                        set {index + 1}
                      </Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange(`friends[${index}].workoutReps`)}
                        onBlur={handleBlur(`friends[${index}].workoutReps`)}
                        value={friend.workoutReps}
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
                        ...props.exerciseObject,
                        exerciseId: '', 
                        setId: `${(values.friends.length) + 1}`,
                        workoutReps: '',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});
