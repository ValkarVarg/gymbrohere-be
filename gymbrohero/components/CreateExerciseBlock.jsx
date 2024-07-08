import React, { useState } from "react";
import { Button, TextInput, View, Text, ScrollView } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import { Formik } from "formik";
import { CreateSet } from "./CreateSet";

export  const CreateExerciseBlock = () => {
    const [exerciseSelected, setExerciseSelected] = useState('')
    const exerciseData = [
        {key:1 ,value: 'squat'},
        {key:2 ,value: 'bench'},
        {key:3 ,value: 'deadlift'},
      ]
    //   const handleAddSet = () => {

    //   }

      return <Formik
      initialValues={{
        orderId: '',
        exerciseId: '', 
        setId: '',
        workoutReps: "",
        workoutWeight: "",
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
        <SelectList setSelected={(val) => {setExerciseSelected(val)}} data={exerciseData} save="value" placeholder='select exercise' 
            value={values.exerciseId}></SelectList>
        <CreateSet/>
        </View>
      )}
    </Formik>
}