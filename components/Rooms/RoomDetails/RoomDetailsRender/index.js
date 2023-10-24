import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';

const RoomDetailsRender = ({ room, studentsList, handleUpdate, handleDelete, navigation }) => {
  return (
    <View style={styles.details}>
      {room && (
        <View>
          <Text style={styles.title}>{room.name}</Text>
          <Text style={styles.description}>{`Description: ${room.description}`}</Text>
          
          {studentsList && studentsList.length > 0 && (
            <View style={styles.participants}>
              <Text style={styles.participantsTitle}>Participants:</Text>
              <FlatList
                data={studentsList}
                keyExtractor={(item) => item.id?.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.participant}>{item.name}</Text>
                )}
              /> 
            </View>
          )}
          
          <TouchableOpacity style={styles.button} onPress={() => handleUpdate(room.id)}>
            <Text style={styles.buttonText}>Update Room</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleDelete(room.id)}>
            <Text style={styles.buttonText}>Delete Room</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

RoomDetailsRender.propTypes = {
  room: PropTypes.object,
  studentsList: PropTypes.array,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
	details: {
	  flex: 1,
	  padding: 20,
	},
	title: {
	  fontSize: 24,
	  fontWeight: 'bold',
	  marginBottom: 10,
	},
	description: {
	  fontSize: 16,
	  marginBottom: 20,
	},
	participants: {
	  marginTop: 20,
	},
	participantsTitle: {
	  fontSize: 20,
	  fontWeight: 'bold',
	  marginBottom: 10,
	},
	participant: {
	  fontSize: 16,
	  marginBottom: 5,
	},
	button: {
	  backgroundColor: 'blue',
	  padding: 10,
	  borderRadius: 5,
	  alignItems: 'center',
	  marginTop: 20,
	},
	buttonText: {
	  color: 'white',
	  fontSize: 16,
	},
  });
  

export default RoomDetailsRender;
