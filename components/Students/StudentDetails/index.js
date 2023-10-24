import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteStudentRequest } from "../../../actions/studentActions";

const StudentDetails = ({
  student,
  studentRoomsNames,
  isLoading,
  navigation,
}) => {
  const dispatch = useDispatch();

  const handleUpdatePress = () => {
    navigation.navigate("UpdateStudent", { studentId: student.id });
  };

  const handleDeletePress = () => {
    dispatch(deleteStudentRequest(student.id));
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>Student not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{student.name}</Text>
      <Text style={styles.detailText}>{`Age: ${student.age}`}</Text>
      <Text style={styles.detailText}>{`Gender: ${student.gender}`}</Text>
      <Text style={styles.detailText}>{`Email: ${
        student.email || "N/A"
      }`}</Text>
      <Text style={styles.detailText}>{`Rooms: ${studentRoomsNames}`}</Text>
      <TouchableOpacity style={styles.button} onPress={handleUpdatePress}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDeletePress}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

StudentDetails.propTypes = {
  student: PropTypes.object,
  studentRoomsNames: PropTypes.string,
  isLoading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
};

StudentDetails.defaultProps = {
  isLoading: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  messageText: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default StudentDetails;
