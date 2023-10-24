// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const loginRequest = credentials => ({
	type: LOGIN_REQUEST,
	payload: credentials,
});

export const loginSuccess = user => ({
	type: LOGIN_SUCCESS,
	payload: user,
});

export const loginFailure = error => ({
	type: LOGIN_FAILURE,
	payload: error,
});

export const logout = () => ({
	type: LOGOUT,
});

// Action Types
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// Action Creators
export const registerRequest = userData => ({
	type: REGISTER_REQUEST,
	payload: userData,
});

export const registerSuccess = () => ({
	type: REGISTER_SUCCESS,
});

export const registerFailure = error => ({
	type: REGISTER_FAILURE,
	payload: error,
});
