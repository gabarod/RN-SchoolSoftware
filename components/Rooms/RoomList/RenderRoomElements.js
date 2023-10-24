import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { deleteRoomRequest } from "../../../actions/roomActions";

const RenderRoomElements = ({ visibleRooms, navigation }) => {
  const dispatch = useDispatch();

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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Rooms", {
            screen: "RoomDetails",
            params: { roomId: item.id },
          })
        }
      >
        <Text style={styles.link}>{item.name}</Text>
      </TouchableOpacity>
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
    <View style={styles.list}>
      <FlatList
        data={visibleRooms}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  link: {
    fontSize: 18,
    color: "blue",
  },
  description: {
    fontSize: 16,
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
});

export default RenderRoomElements;
