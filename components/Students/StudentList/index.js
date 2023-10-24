import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import { fetchStudentsRequest } from "../../../actions/studentActions";
import RenderStudentElements from "./RenderStudentElements";
import useGetStudents from "../../../hooks/useGetStudents";

const StudentList = ({ navigation }) => {
  const dispatch = useDispatch();
  const students = useGetStudents();
  const isLoading = useSelector((state) => state.students.isLoading);
  const error = useSelector((state) => state.students.error);

  useEffect(() => {
    dispatch(fetchStudentsRequest());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <Text style={styles.title}>Students</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddStudent")}
      >
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>Error: {error}</Text> : null}
      <RenderStudentElements students={students} navigation={navigation} />
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
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
});

export default StudentList;
