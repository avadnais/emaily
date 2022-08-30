import axios from 'axios';
import { FETCH_USER } from './types';

// whenever this action creator gets called it immediately returns a function
// if redux-thunk sees a function being returned, it will call this function and call dispatch as an arg
export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');
	dispatch({
		type: FETCH_USER,
		payload: res.data
	});
};
