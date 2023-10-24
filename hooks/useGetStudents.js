import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsRequest } from '../actions/studentActions';

const useGetStudents = () => {
	const dispatch = useDispatch();
	const students = useSelector(state => state.students.students);

	useEffect(() => {
		if (students.length === 0) {
			dispatch(fetchStudentsRequest());
		}
	}, [dispatch, students.length]);
	return students;
};

export default useGetStudents;
