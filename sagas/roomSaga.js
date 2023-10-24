import { call, put, all, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_ROOMS_REQUEST,
  ADD_ROOM_REQUEST,
  UPDATE_ROOM_REQUEST,
  DELETE_ROOM_REQUEST,
  fetchRoomsSuccess,
  fetchRoomsFailure,
  addRoomSuccess,
  addRoomFailure,
  updateRoomSuccess,
  updateRoomFailure,
  deleteRoomSuccess,
  deleteRoomFailure,
  FETCH_ROOM_BY_ID_REQUEST,
} from "../actions/roomActions";
import { fetchStudentByIdRequest } from "../actions/studentActions";

const ROOMS_ENDPOINT = "https://my-json-server.typicode.com/gabarod/RN-SchoolSoftware/rooms";

function* fetchRoom(action) {
  try {
    const roomResponse = yield call(
      axios.get,
      `${ROOMS_ENDPOINT}/${action.payload.id}`
    );
    const roomData = roomResponse.data;

    const studentIds = roomData.students.map((student) => student.student_id);
    const students = yield all(
      studentIds.map((id) => call(fetchStudentByIdRequest, id))
    );

    const roomWithStudents = { ...roomData, students };
    yield put(fetchRoomsSuccess(roomWithStudents));
  } catch (error) {
    yield put(fetchRoomsFailure(error.message));
  }
}

function* fetchRooms() {
  try {
    try {
      response = yield call(axios.get, ROOMS_ENDPOINT);
    } catch (error) {
      throw new Error("Failed to fetch rooms");
    }
    if (response.status !== 200) {
      throw new Error("Failed to fetch rooms");
    }
    yield put(fetchRoomsSuccess(response.data));
  } catch (error) {
    yield put(fetchRoomsFailure(error.message));
  }
}

function* addRoom(action) {
  try {
    const response = yield call(axios.post, ROOMS_ENDPOINT, action.payload);
    if (response.status === 201) {
      yield put(addRoomSuccess(response.data));
    } else {
      yield put(addRoomFailure("An error occurred while adding a new room"));
    }
  } catch (error) {
    yield put(addRoomFailure(error.message));
  }
}

function* updateRoom(action) {
  try {
    const response = yield call(
      axios.put,
      `${ROOMS_ENDPOINT}/${action.payload.id}`,
      action.payload
    );
    if (response.status !== 200) {
      throw new Error("Failed to update room");
    }
    yield put(updateRoomSuccess(response.data));
  } catch (error) {
    yield put(updateRoomFailure(error.message));
  }
}

function* deleteRoom(action) {
  try {
    const response = yield call(
      axios.delete,
      `${ROOMS_ENDPOINT}/${action.payload}`
    );
    if (response.status !== 200) {
      throw new Error("Error deleting room");
    }
    yield put(deleteRoomSuccess(action.payload));
  } catch (error) {
    yield put(deleteRoomFailure(error.message));
  }
}

export function* roomSaga() {
  yield all([
    takeEvery(FETCH_ROOMS_REQUEST, fetchRooms),
    takeEvery(ADD_ROOM_REQUEST, addRoom),
    takeEvery(UPDATE_ROOM_REQUEST, updateRoom),
    takeEvery(DELETE_ROOM_REQUEST, deleteRoom),
    takeEvery(FETCH_ROOM_BY_ID_REQUEST, fetchRoom),
  ]);
}
