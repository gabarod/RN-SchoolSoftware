import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";
import { addStudentRequest } from "../../../actions/studentActions";
import useGetRooms from "../../../hooks/useGetRooms";

const AddStudent = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const rooms = useGetRooms();

  useEffect(() => {
    if (formik.values.roomId) {
      formik.setFieldValue("roomId", String(formik.values.roomId));
    }
  }, [formik?.values?.roomId]);

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const roomOptions = rooms?.map((room) => ({
    label: room.name,
    value: String(room.id),
  }));

  const formik = useFormik({
    initialValues: { name: "", age: "", email: "", gender: "", roomId: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      age: Yup.number()
        .required("Required")
        .positive("Age must be positive")
        .integer("Age must be an integer"),
      email: Yup.string().email("Invalid email address").required("Required"),
      gender: Yup.string().required("Required"),
      roomId: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      dispatch(addStudentRequest({...values, age: parseInt(values.age)}));
      navigation.goBack();
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <Text style={styles.errorText}>{formik.errors.name}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Age"
        onChangeText={formik.handleChange("age")}
        onBlur={formik.handleBlur("age")}
        value={formik.values.age}
        keyboardType="numeric"
      />
      {formik.touched.age && formik.errors.age ? (
        <Text style={styles.errorText}>{formik.errors.age}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        value={formik.values.email}
        keyboardType="email-address"
      />
      {formik.touched.email && formik.errors.email ? (
        <Text style={styles.errorText}>{formik.errors.email}</Text>
      ) : null}
      <RNPickerSelect
        onValueChange={formik.handleChange("gender")}
        items={genderOptions}
        style={pickerSelectStyles}
        placeholder={{ label: "Select Gender...", value: null }}
      />
      {formik.touched.gender && formik.errors.gender ? (
        <Text style={styles.errorText}>{formik.errors.gender}</Text>
      ) : null}
      <RNPickerSelect
        onValueChange={formik.handleChange("roomId")}
        items={roomOptions}
        style={pickerSelectStyles}
        placeholder={{ label: "Select Room...", value: null }}
      />
      {formik.touched.roomId && formik.errors.roomId ? (
        <Text style={styles.errorText}>{formik.errors.roomId}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.button}
        onPress={formik.handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Add</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 16,
  },
});

export default AddStudent;
