import { all } from 'redux-saga/effects';
import { roomSaga } from './roomSaga';
import { studentSaga } from './studentSaga';

export default function* rootSaga() {
	yield all([roomSaga(), studentSaga()]);
}
