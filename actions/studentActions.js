// Action Types
export const FETCH_STUDENTS_REQUEST = 'FETCH_STUDENTS_REQUEST';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';

export const FETCH_STUDENT_BY_ID_REQUEST = 'FETCH_STUDENT_BY_ID_REQUEST';
export const FETCH_STUDENT_BY_ID_SUCCESS = 'FETCH_STUDENT_BY_ID_SUCCESS';
export const FETCH_STUDENT_BY_ID_FAILURE = 'FETCH_STUDENT_BY_ID_FAILURE';

export const ADD_STUDENT_REQUEST = 'ADD_STUDENT_REQUEST';
export const ADD_STUDENT_SUCCESS = 'ADD_STUDENT_SUCCESS';
export const ADD_STUDENT_FAILURE = 'ADD_STUDENT_FAILURE';

export const DELETE_STUDENT_REQUEST = 'DELETE_STUDENT_REQUEST';
export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS';
export const DELETE_STUDENT_FAILURE = 'DELETE_STUDENT_FAILURE';

export const UPDATE_STUDENT_REQUEST = 'UPDATE_STUDENT_REQUEST';
export const UPDATE_STUDENT_SUCCESS = 'UPDATE_STUDENT_SUCCESS';
export const UPDATE_STUDENT_FAILURE = 'UPDATE_STUDENT_FAILURE';

// Action Creators
export const updateStudentRequest = student => ({
	type: UPDATE_STUDENT_REQUEST,
	payload: student,
});

export const updateStudentSuccess = student => ({
	type: UPDATE_STUDENT_SUCCESS,
	payload: student,
});

export const updateStudentFailure = error => ({
	type: UPDATE_STUDENT_FAILURE,
	payload: error,
});

export const fetchStudentsRequest = () => ({
	type: FETCH_STUDENTS_REQUEST,
});

export const fetchStudentsSuccess = students => ({
	type: FETCH_STUDENTS_SUCCESS,
	payload: students,
});

export const fetchStudentsFailure = error => ({
	type: FETCH_STUDENTS_FAILURE,
	payload: error,
});

export const fetchStudentByIdRequest = () => ({
	type: FETCH_STUDENT_BY_ID_REQUEST,
});

export const fetchStudentByIdSuccess = student => ({
	type: FETCH_STUDENT_BY_ID_SUCCESS,
	payload: student,
});

export const fetchStudentByIDFailure = error => ({
	type: FETCH_STUDENT_BY_ID_FAILURE,
	payload: error,
});

export const addStudentRequest = studentData => ({
	type: ADD_STUDENT_REQUEST,
	payload: studentData,
});

export const addStudentSuccess = student => ({
	type: ADD_STUDENT_SUCCESS,
	payload: student,
});

export const addStudentFailure = error => ({
	type: ADD_STUDENT_FAILURE,
	payload: error,
});

export const deleteStudentRequest = studentId => ({
	type: DELETE_STUDENT_REQUEST,
	payload: studentId,
});

export const deleteStudentSuccess = studentId => ({
	type: DELETE_STUDENT_SUCCESS,
	payload: studentId,
});

export const deleteStudentFailure = error => ({
	type: DELETE_STUDENT_FAILURE,
	payload: error,
});
