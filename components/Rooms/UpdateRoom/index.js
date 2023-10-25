import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateRoomRequest } from "../../../actions/roomActions";
import useGetRooms from "../../../hooks/useGetRooms";
import useGetStudents from "../../../hooks/useGetStudents";

const UpdateRoom = ({ route, navigation }) => {
  const roomId = route?.params?.roomId;
  const dispatch = useDispatch();
  const rooms = useGetRooms();
  const isLoading = useSelector((state) => state.rooms.isLoading);
  const room = rooms.find((room) => room.id === parseInt(roomId));

  const formik = useFormik({
    initialValues: {
      name: room?.name || "",
      description: room?.description || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateRoomRequest({ ...values, id: roomId }));
      navigation.goBack();
    },
  });

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Update Room</Text>
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
            <Text style={styles.buttonText}>Update Room</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default UpdateRoom;
