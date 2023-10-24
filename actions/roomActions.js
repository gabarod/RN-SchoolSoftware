// Action Types
export const FETCH_ROOMS_REQUEST = 'FETCH_ROOMS_REQUEST';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS_FAILURE = 'FETCH_ROOMS_FAILURE';

export const FETCH_ROOM_BY_ID_REQUEST = 'FETCH_ROOM_BY_ID_REQUEST';
export const FETCH_ROOM_BY_ID_SUCCESS = 'FETCH_ROOM_BY_ID_SUCCESS';
export const FETCH_ROOM_BY_ID_FAILURE = 'FETCH_ROOM_BY_ID_FAILURE';

export const ADD_ROOM_REQUEST = 'ADD_ROOM_REQUEST';
export const ADD_ROOM_SUCCESS = 'ADD_ROOM_SUCCESS';
export const ADD_ROOM_FAILURE = 'ADD_ROOM_FAILURE';

export const DELETE_ROOM_REQUEST = 'DELETE_ROOM_REQUEST';
export const DELETE_ROOM_SUCCESS = 'DELETE_ROOM_SUCCESS';
export const DELETE_ROOM_FAILURE = 'DELETE_ROOM_FAILURE';

export const UPDATE_ROOM_REQUEST = 'UPDATE_ROOM_REQUEST';
export const UPDATE_ROOM_SUCCESS = 'UPDATE_ROOM_SUCCESS';
export const UPDATE_ROOM_FAILURE = 'UPDATE_ROOM_FAILURE';
export const UPDATE_ROOM_SUBMISSION_COMPLETE = 'UPDATE_ROOM_SUBMISSION_COMPLETE';

// Action Creators
export const updateRoomRequest = room => ({
	type: UPDATE_ROOM_REQUEST,
	payload: room,
});

export const updateRoomSuccess = room => ({
	type: UPDATE_ROOM_SUCCESS,
	payload: room,
});

export const updateRoomFailure = error => ({
	type: UPDATE_ROOM_FAILURE,
	payload: error,
});

export const fetchRoomsRequest = () => ({
	type: FETCH_ROOMS_REQUEST,
});

export const fetchRoomsSuccess = rooms => ({
	type: FETCH_ROOMS_SUCCESS,
	payload: rooms,
});

export const fetchRoomsFailure = error => ({
	type: FETCH_ROOMS_FAILURE,
	payload: error,
});

export const addRoomRequest = room => ({
	type: ADD_ROOM_REQUEST,
	payload: room,
});

export const addRoomSuccess = room => ({
	type: ADD_ROOM_SUCCESS,
	payload: room,
});

export const addRoomFailure = error => ({
	type: ADD_ROOM_FAILURE,
	payload: error,
});

export const deleteRoomRequest = roomId => ({
	type: DELETE_ROOM_REQUEST,
	payload: roomId,
});

export const deleteRoomSuccess = roomId => ({
	type: DELETE_ROOM_SUCCESS,
	payload: roomId,
});

export const deleteRoomFailure = error => ({
	type: DELETE_ROOM_FAILURE,
	payload: error,
});
