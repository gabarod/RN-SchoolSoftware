import {
  FETCH_ROOMS_REQUEST,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_FAILURE,
  ADD_ROOM_REQUEST,
  ADD_ROOM_SUCCESS,
  ADD_ROOM_FAILURE,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAILURE,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAILURE,
} from "../actions/roomActions";

const initialState = {
  rooms: [],
  isLoading: false,
  error: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMS_REQUEST:
    case ADD_ROOM_REQUEST:
    case UPDATE_ROOM_REQUEST:
    case DELETE_ROOM_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
        isLoading: false,
      };
    case ADD_ROOM_SUCCESS:
      return {
        ...state,
        rooms: [
          ...state.rooms,
          {
            id: state.rooms.length + 1,
            ...action.payload,
          },
        ],
        isLoading: false,
      };
    case UPDATE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id === action.payload.id ? { ...room, ...action.payload } : room
        ),
        isLoading: false,
      };
    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: state.rooms.filter((room) => room.id !== action.payload),
        isLoading: false,
      };
    case FETCH_ROOMS_FAILURE:
    case ADD_ROOM_FAILURE:
    case UPDATE_ROOM_FAILURE:
    case DELETE_ROOM_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default roomReducer;
