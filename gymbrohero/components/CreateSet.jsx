import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { View, Text, ScrollView, Pressable, Button } from 'react-native';


export const CreateSet = () => {
  const initialValues = {
    friends: [
      {
        name: '',
        email: '',
      },
      {
        name: '',
        email: '',
      }
    ],
  };

  return (
    <View>
      <Text>in create set!</Text>
      <Formik 
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));}}>
            {({values}) => (
                <View>
                    <Text>new field</Text>
                     <Button title='new button'></Button>
                    <FieldArray name='set'>
                   </FieldArray>
                        <View>{ values.friends.map((friend,index) => (
                            <View><Text>hello!</Text>
                            <Button onPress={() => push({ name: '', email: ''})} title="add set"></Button></View>
                        ))}
                    <Form>
                        <FieldArray name="friends" render={arrayHelpers => (<View>{values.friends && values.friends.length > 0 (values.friends.map((friend, index) => (
                            <View key={index} ><button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                            -</button><View/>
                        )))</View> : (<Text>placeholder</Text></View>)})}>
                        
                        </FieldArray>
                        </Form>
                </View>
            )}
      </Formik>
    </View>
  );
};
