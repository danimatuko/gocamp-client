import {
	GET_ALL_USERS_REQUEST,
	GET_ALL_USERS_SUCCESS,
	GET_ALL_USERS_FAIL,
	DELETE_USER_REQUEST,
	DELETE_USER_FAIL,
	GET_USER_PROFILE_REQUEST,
	GET_USER_PROFILE_FAIL,
	GET_USER_PROFILE_SUCCESS,
	EDIT_USER_PROFILE_REQUEST,
	EDIT_USER_PROFILE_FAIL,
	EDIT_USER_PROFILE_SUCCESS
} from "../admin/adminTypes";

const initialState = {
	users: [],
	userProfile: {},
	loading: false,
	error: null
};

const adminReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_ALL_USERS_REQUEST:
		case DELETE_USER_REQUEST:
		case GET_USER_PROFILE_REQUEST:
		case EDIT_USER_PROFILE_REQUEST:
			return {
				...state,
				loading: true
			};
		case GET_ALL_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				users: payload
			};
		case GET_ALL_USERS_FAIL:
		case DELETE_USER_FAIL:
		case GET_USER_PROFILE_FAIL:
		case EDIT_USER_PROFILE_FAIL:
			return {
				...state,
				loading: false,
				error: payload
			};

		case GET_USER_PROFILE_SUCCESS:
		case EDIT_USER_PROFILE_SUCCESS:
			return {
				...state,
				userProfile: payload,
				loading: false
			};

		default:
			return state;
	}
};

export default adminReducer;
