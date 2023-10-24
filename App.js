import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./store";
import RoomList from "./components/Rooms/RoomList/RoomList";
import AddRoom from "./components/Rooms/AddRoom/index.js";
import StudentDetailsContainer from "./components/Students/StudentDetails/StudentDetailsContainer";
import UpdateStudent from "./components/Students/UpdateStudent";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentList from "./components/Students/StudentList";
import AddStudent from "./components/Students/AddStudent";
import RoomDetailsContainer from "./components/Rooms/RoomDetails/RoomDetailsContainer";
import UpdateRoom from "./components/Rooms/UpdateRoom";
import { StyleSheet, View } from "react-native";
import Footer from "./components/Footer";

const Drawer = createDrawerNavigator();
const RoomStack = createStackNavigator();
const StudentStack = createStackNavigator();

const RoomStackScreen = () => (
  <RoomStack.Navigator>
    <RoomStack.Screen name="RoomList" component={RoomList} />
    <RoomStack.Screen name="AddRoom" component={AddRoom} />
    <RoomStack.Screen name="RoomDetails" component={RoomDetailsContainer} />
    <RoomStack.Screen name="UpdateRoom" component={UpdateRoom} />
  </RoomStack.Navigator>
);

const StudentStackScreen = () => (
  <StudentStack.Navigator>
    <StudentStack.Screen name="StudentList" component={StudentList} />
    <StudentStack.Screen
      name="StudentDetails"
      component={StudentDetailsContainer}
    />
    <StudentStack.Screen name="UpdateStudent" component={UpdateStudent} />
    <StudentStack.Screen name="AddStudent" component={AddStudent} />
  </StudentStack.Navigator>
);

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Rooms">
          <Drawer.Screen name="Rooms" component={RoomStackScreen} />
          <Drawer.Screen name="Students" component={StudentStackScreen} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
        </Drawer.Navigator>
      </NavigationContainer>
      <Footer />
    </View>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
