import Axios from "axios";
import {
	GET_ALL_USERS_REQUEST,
	GET_ALL_USERS_SUCCESS,
	GET_ALL_USERS_FAIL,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
	GET_USER_PROFILE_REQUEST,
	GET_USER_PROFILE_SUCCESS,
	GET_USER_PROFILE_FAIL,
	EDIT_USER_PROFILE_REQUEST,
	EDIT_USER_PROFILE_SUCCESS,
	EDIT_USER_PROFILE_FAIL
} from "./adminTypes";

export const getUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_ALL_USERS_REQUEST
		});

		const {
			user: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `${userInfo.token}`
			}
		};

		const { data } = await Axios.get("/api/users", config);

		dispatch({
			type: GET_ALL_USERS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: GET_ALL_USERS_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DELETE_USER_REQUEST
		});

		const {
			user: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `${userInfo.token}`
			}
		};

		const { data } = await Axios.delete(`/api/users/${id}`, config);

		dispatch({
			type: DELETE_USER_SUCCESS,
			payload: data
		});

		dispatch(getUsers());
	} catch (error) {
		dispatch({
			type: DELETE_USER_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};

export const getUserById = (id) => async (dispatch, getState) => {
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

		const { data } = await Axios.get(`/api/users/${id}`, config);

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

export const editUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: EDIT_USER_PROFILE_REQUEST
		});

		const {
			user: { userInfo }
		} = getState();

		const config = {
			headers: {
				"Content-Type": "Application/json",
				Authorization: `${userInfo.token}`
			}
		};

		const { data } = await Axios.put(`/api/users/${user._id}/edit`, user, config);

		dispatch({
			type: EDIT_USER_PROFILE_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: EDIT_USER_PROFILE_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};
