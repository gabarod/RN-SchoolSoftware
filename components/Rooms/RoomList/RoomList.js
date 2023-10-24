import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { fetchRoomsRequest, deleteRoomRequest } from "../../../actions/roomActions";
import useGetRooms from "../../../hooks/useGetRooms";

const RoomList = ({ navigation }) => {
  const dispatch = useDispatch();
  const rooms = useGetRooms();
  const isLoading = useSelector((state) => state.rooms.isLoading);
  const error = useSelector((state) => state.rooms.error);

  useEffect(() => {
    dispatch(fetchRoomsRequest());
  }, [dispatch]);

  const deleteRoomHandler = (roomId) => {
    Alert.alert(
      "Delete Room",
      "Are you sure you want to delete this room?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => dispatch(deleteRoomRequest(roomId)) },
      ],
      { cancelable: false }
    );
  };

  const renderRoomItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text
        style={styles.description}
      >{`Description: ${item.description}`}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Rooms", {
              screen: "RoomDetails",
              params: { roomId: item.id },
            })
          }
        >
          <Text style={styles.buttonText}>Show more</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => deleteRoomHandler(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <Text style={styles.title}>Rooms</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddRoom")}
      >
        <Text style={styles.buttonText}>Add Room</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>Error: {error}</Text> : null}
      <FlatList
        data={rooms}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={renderRoomItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
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
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
});

export default RoomList;
