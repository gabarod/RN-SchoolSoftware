import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsRequest } from "../../../actions/studentActions";
import StudentDetails from "../StudentDetails";
import useGetStudents from "../../../hooks/useGetStudents";
import useGetRooms from "../../../hooks/useGetRooms";

const StudentDetailsContainer = ({ route, navigation }) => {
  const studentId = route?.params?.studentId;
  const dispatch = useDispatch();
  const students = useGetStudents();
  const rooms = useGetRooms();
  const student = students?.find(
    (students) => students.id === parseInt(studentId)
  );
  const studentRoomsNames =
    rooms
      ?.filter((room) => student?.room_ids?.includes(room?.id))
      ?.map((room) => room.name)
      .join(", ") || "N/A";
  const loading = useSelector((state) => state.students.loading);

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentsRequest(studentId));
    }
  }, [dispatch, studentId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Student not found</Text>
      </View>
    );
  }

  return (
    <StudentDetails
      student={student}
      studentRoomsNames={studentRoomsNames}
      navigation={navigation}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default StudentDetailsContainer;
