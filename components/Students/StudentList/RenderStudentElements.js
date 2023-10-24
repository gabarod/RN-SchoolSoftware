import React from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { deleteStudentRequest } from "../../../actions/studentActions";

const RenderStudentElements = ({ students, navigation }) => {
  const dispatch = useDispatch();

  const deleteStudent = (studentId) => {
    dispatch(deleteStudentRequest(studentId));
  };

  const handleDelete = (studentId, studentName) => {
    Alert.alert(
      "Delete Student",
      `Are you sure you want to delete ${studentName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteStudent(studentId),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("StudentDetails", { studentId: item.id })
        }
      >
        <Text style={styles.link}>{item.name}</Text>
      </TouchableOpacity>
      <Text style={styles.age}>{`Age: ${item.age}`}</Text>
      <Text style={styles.gender}>{`Gender: ${item.gender}`}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("StudentDetails", { studentId: item.id })
          }
        >
          <Text style={styles.buttonText}>Show more</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDelete(item.id, item.name)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={students}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  link: {
    fontSize: 18,
    color: "#0645AD",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
  age: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  gender: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default RenderStudentElements;
