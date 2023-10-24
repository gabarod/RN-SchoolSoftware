import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  updateStudentRequest,
  fetchStudentsRequest,
} from "../../../actions/studentActions";
import useGetStudents from "../../../hooks/useGetStudents";
import useGetRooms from "../../../hooks/useGetRooms";
import RNPickerSelect from "react-native-picker-select";

const UpdateStudent = ({ route, navigation }) => {
  const studentId = route?.params?.studentId;
  const dispatch = useDispatch();
  const students = useGetStudents();
  const rooms = useGetRooms();
  const isLoading = useSelector((state) => state.students.isLoading);
  const student = students.find((s) => s.id === parseInt(studentId));
  const [selectedRooms, setSelectedRooms] = useState(student?.room_ids || []);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (studentId && !student) {
      dispatch(fetchStudentsRequest());
    }
  }, [dispatch, studentId, student]);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const formik = useFormik({
    initialValues: {
      name: student?.name || "",
      age: student?.age || "",
      gender: student?.gender || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      age: Yup.number()
        .required("Required")
        .positive("Age must be positive")
        .integer("Age must be an integer"),
      gender: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(
        updateStudentRequest({
          ...values,
          room_ids: selectedRooms,
          age: parseInt(values.age),
          id: studentId,
        })
      );
      navigation.goBack();
    },
  });

  const handleToggleRoom = useCallback((roomId) => {
    setSelectedRooms((prevSelectedRooms) =>
      prevSelectedRooms.includes(roomId)
        ? prevSelectedRooms.filter((id) => id !== roomId)
        : [...prevSelectedRooms, roomId]
    );
  }, []);

  const handleAddRoom = () => {
    if (selectedRoom && !selectedRooms.includes(selectedRoom)) {
      setSelectedRooms([...selectedRooms, selectedRoom]);
      setSelectedRoom(null);
    }
  };

  const renderRoomItem = useCallback(
    ({ item }) => (
      <View key={item?.id} style={styles.roomItem}>
        <Text>{rooms.find((room) => room.id === item)?.name || "N/A"}</Text>
        <TouchableOpacity
          onPress={() => handleToggleRoom(item)}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    ),
    [rooms, handleToggleRoom]
  );

  const renderHeader = useCallback(
    () => (
      <>
        <Text style={styles.title}>Update Student</Text>
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
          value={String(formik.values.age)}
          keyboardType="numeric"
        />
        {formik.touched.age && formik.errors.age ? (
          <Text style={styles.errorText}>{formik.errors.age}</Text>
        ) : null}
        <RNPickerSelect
          onValueChange={formik.handleChange("gender")}
          items={genderOptions}
          placeholder={{ label: "Select gender...", value: "" }}
          value={formik.values.gender}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 20,
              right: 15,
            },
          }}
          useNativeAndroidPickerStyle={false}
        />
        {formik.touched.gender && formik.errors.gender ? (
          <Text style={styles.errorText}>{formik.errors.gender}</Text>
        ) : null}
        <RNPickerSelect
          onValueChange={(value) => setSelectedRoom(value)}
          items={rooms.map((room) => ({ label: room.name, value: room.id }))}
          placeholder={{ label: "Select a room...", value: null }}
          value={selectedRoom}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 20,
              right: 15,
            },
          }}
          useNativeAndroidPickerStyle={false}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddRoom}
          disabled={!selectedRoom}
        >
          <Text style={styles.addButtonText}>Add Room</Text>
        </TouchableOpacity>
      </>
    ),
    [formik, rooms, selectedRoom, handleAddRoom]
  );

  const renderFooter = useCallback(
    () => (
      <TouchableOpacity
        style={styles.button}
        onPress={formik.handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Update Student</Text>
        )}
      </TouchableOpacity>
    ),
    [formik, isLoading]
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={selectedRooms}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={(item) => renderRoomItem(item)}
      />
      {renderFooter()}
    </View>
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
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
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
  roomItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  removeButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
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
    marginBottom: 10,
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
    marginBottom: 10,
  },
});

export default UpdateStudent;
