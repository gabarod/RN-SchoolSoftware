import React from "react";
import { View, StyleSheet, ActivityIndicator, Text, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import RoomDetailsRender from "../RoomDetailsRender";
import useGetRooms from "../../../../hooks/useGetRooms";
import useGetStudents from "../../../../hooks/useGetStudents";
import { deleteRoomRequest } from "../../../../actions/roomActions"

const RoomDetailsContainer = ({ route, navigation }) => {
  const id = route?.params?.roomId;
  const loading = useSelector((state) => state.rooms.loading);
  const dispatch = useDispatch();

  const rooms = useGetRooms();
  const students = useGetStudents();

  const room = rooms?.find((room) => room.id === parseInt(id));
  const studentList = students?.filter(
    (students) => students.room_id === parseInt(id)
  );

  const handleUpdate = (roomId) => {
    navigation.navigate("UpdateRoom", { roomId });
  };

  const deleteRoom = (roomId) => {
    dispatch(deleteRoomRequest(roomId));
    navigation.navigate("RoomList");
  };

  const handleDelete = (roomId) => {
    Alert.alert(
      "Delete Room",
      "Are you sure you want to delete this room?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteRoom(roomId) },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!room) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Room not found</Text>
      </View>
    );
  }

  return (
    <RoomDetailsRender
      room={room}
      studentsList={studentList}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
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

export default RoomDetailsContainer;
