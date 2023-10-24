import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addRoomRequest } from "../../../actions/roomActions";

const AddRoom = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.rooms.isLoading);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(addRoomRequest({ ...values }));
      navigation.goBack();
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Room</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name && (
        <Text style={styles.errorText}>{formik.errors.name}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={formik.handleChange("description")}
        onBlur={formik.handleBlur("description")}
        value={formik.values.description}
      />
      {formik.touched.description && formik.errors.description && (
        <Text style={styles.errorText}>{formik.errors.description}</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={formik.handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Add Room</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
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

export default AddRoom;
