import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';

import roomReducer from './reducers/roomReducer';
import studentReducer from './reducers/studentReducer';
import rootSaga from './sagas';

const rootReducer = combineReducers({
  rooms: roomReducer,
  students: studentReducer,
});

const composeEnhancers = composeWithDevTools({
  suppressConnectErrors: false,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
