import { all, call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_STUDENTS_REQUEST,
  ADD_STUDENT_REQUEST,
  UPDATE_STUDENT_REQUEST,
  DELETE_STUDENT_REQUEST,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  addStudentSuccess,
  addStudentFailure,
  updateStudentSuccess,
  updateStudentFailure,
  deleteStudentSuccess,
  deleteStudentFailure,
  fetchStudentByIdSuccess,
  fetchStudentByIDFailure,
  FETCH_STUDENT_BY_ID_REQUEST,
} from "../actions/studentActions";

const STUDENTS_ENDPOINT =
  "https://my-json-server.typicode.com/gabarod/RN-SchoolSoftware/students";

function* fetchStudents() {
  try {
    const response = yield call(axios.get, STUDENTS_ENDPOINT);
    if (response.status !== 200) {
      throw new Error(`Error ${response.status}`);
    }
    yield put(fetchStudentsSuccess(response.data));
  } catch (error) {
    yield put(fetchStudentsFailure(error.message));
  }
}

function* fetchStudentById(action) {
  try {
    const response = yield call(
      axios.get,
      `${STUDENTS_ENDPOINT}/${action.payload}`
    );
    if (response.status === 404) {
      yield put(fetchStudentByIDFailure("Student not found"));
    } else {
      yield put(fetchStudentByIdSuccess(response.data));
    }
  } catch (error) {
    yield put(fetchStudentByIDFailure(error.message));
  }
}

function* addStudent(action) {
  try {
    const response = yield call(axios.post, STUDENTS_ENDPOINT, action.payload);
    if (response.status === 201) {
      yield put(addStudentSuccess(response.data));
    } else {
      yield put(
        addStudentFailure("An error occurred while adding a new student")
      );
    }
  } catch (error) {
    yield put(addStudentFailure(error.message));
  }
}

function* updateStudent(action) {
  try {
    const response = yield call(
      axios.put,
      `${STUDENTS_ENDPOINT}/${action.payload.id}`,
      action.payload
    );
    if (response.status !== 200) {
      throw new Error("Failed to update student");
    }
    yield put(updateStudentSuccess(response.data));
  } catch (error) {
    yield put(updateStudentFailure(error.message));
  }
}

function* deleteStudent(action) {
  try {
    const response = yield call(
      axios.delete,
      `${STUDENTS_ENDPOINT}/${action.payload}`
    );
    if (response.status !== 200) {
      throw new Error("Error deleting student");
    }
    yield put(deleteStudentSuccess(action.payload));
  } catch (error) {
    yield put(deleteStudentFailure(error.message));
  }
}

export function* studentSaga() {
  yield all([
    takeEvery(FETCH_STUDENTS_REQUEST, fetchStudents),
    takeEvery(ADD_STUDENT_REQUEST, addStudent),
    takeEvery(UPDATE_STUDENT_REQUEST, updateStudent),
    takeEvery(DELETE_STUDENT_REQUEST, deleteStudent),
    takeEvery(FETCH_STUDENT_BY_ID_REQUEST, fetchStudentById),
  ]);
}
