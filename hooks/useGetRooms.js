import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsRequest } from '../actions/roomActions';

const useGetRooms = () => {
	const dispatch = useDispatch();
	const rooms = useSelector(state => state.rooms.rooms);

	useEffect(() => {
		if (rooms.length === 0) {
			dispatch(fetchRoomsRequest());
		}
	}, [dispatch, rooms.length]);
	return rooms;
};

export default useGetRooms;
