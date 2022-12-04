import {
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	REGISTER,
	REGISTER_SUCCESS,
	REGISTER_FAIL
} from "./userTypes";

const initialState = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: null,
	loading: false,
	error: null
};

const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN:
		case REGISTER:
			return {
				...state,
				loading: true,
				userInfo: payload
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				userInfo: payload
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			return {
				...state,
				loading: false,
				error: payload
			};
		case LOGOUT:
			return {
				...state,
				userInfo: null
			};
		default:
			return state;
	}
};

export default userReducer;
