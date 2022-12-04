import Axios from "axios";
import {
	GET_USER_PROFILE_FAIL,
	GET_USER_PROFILE_REQUEST,
	GET_USER_PROFILE_SUCCESS
} from "../admin/adminTypes";
import {
	GET_USER_DETAILS_FAIL,
	GET_USER_DETAILS_REQUEST,
	GET_USER_DETAILS_SUCCESS,
	LOGIN,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER,
	REGISTER_FAIL,
	REGISTER_SUCCESS
} from "./userTypes";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: LOGIN
		});

		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const { data } = await Axios.post("/api/users/login", { email, password }, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: data
		});

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({
		type: LOGOUT
	});
	document.location.href = "/login";
};

export const register = (first_name, last_name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: REGISTER
		});

		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const { data } = await Axios.post(
			"/api/users",
			{ first_name, last_name, email, password },
			config
		);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: data
		});

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: REGISTER_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_USER_DETAILS_REQUEST
		});

		const {
			user: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `${userInfo.token}`
			}
		};

		const { data } = await Axios.get(`/api/users/${id}`, config);

		dispatch({
			type: GET_USER_DETAILS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: GET_USER_DETAILS_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};

export const getUserProfile = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_USER_PROFILE_REQUEST
		});

		const {
			user: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `${userInfo.token}`
			}
		};

		const { data } = await Axios.get(`/api/users/${id}/profile`, config);

		dispatch({
			type: GET_USER_PROFILE_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: GET_USER_PROFILE_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};
