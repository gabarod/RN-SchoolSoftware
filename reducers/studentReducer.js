import {
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,
  UPDATE_STUDENT_REQUEST,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAILURE,
  DELETE_STUDENT_REQUEST,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE,
} from "../actions/studentActions";

const initialState = {
  students: [],
  isLoading: false,
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_REQUEST:
    case ADD_STUDENT_REQUEST:
    case UPDATE_STUDENT_REQUEST:
    case DELETE_STUDENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
        isLoading: false,
      };
    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        students: [
          ...state.students,
          {
            id: Math.max(...state.students.map((s) => s.id), 0) + 1,
            ...action.payload,
          },
        ],
        isLoading: false,
      };
    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id
            ? { ...student, ...action.payload }
            : student
        ),
        isLoading: false,
      };
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
        isLoading: false,
      };
    case FETCH_STUDENTS_FAILURE:
    case ADD_STUDENT_FAILURE:
    case UPDATE_STUDENT_FAILURE:
    case DELETE_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
