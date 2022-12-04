import Axios from "axios";
import {
	CREATE_ORDER_FAIL,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	GET_ORDER_DETAILS_FAIL,
	GET_ORDER_DETAILS_REQUEST,
	GET_ORDER_DETAILS_SUCCESS,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_DETAILS_RESET,
	GET_MY_ORDERS_REQUEST,
	GET_MY_ORDERS_SUCCESS,
	GET_MY_ORDERS_FAIL,
	GET_ALL_ORDERS_REQUEST,
	GET_ALL_ORDERS_SUCCESS,
	GET_ALL_ORDERS_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL
} from "./types";

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_RESET
		});

		dispatch({
			type: CREATE_ORDER_REQUEST
		});

		const {
			user: { userInfo }
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `${userInfo.token}`
			}
		};

		const { data } = await Axios.post("/api/orders", order, config);

		dispatch({
			type: CREATE_ORDER_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: CREATE_ORDER_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_ORDER_DETAILS_REQUEST
		});

		const {
			user: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `${userInfo.token}`
			}
		};

		const { data } = await Axios.get(`/api/orders/${id}`, config);

		dispatch({
			type: GET_ORDER_DETAILS_SUCCESS,
			payload: data
		});
		localStorage.setItem("orderDetails", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: GET_ORDER_DETAILS_FAIL,
			payload: error.message
		});
	}
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST
		});

		const {
			user: { userInfo }
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `${userInfo.token}`
			}
		};

		const { data } = await Axios.put(`/api/orders/${id}/pay`, paymentResult, config);

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};

export const deliverOrder = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST
		});

		const {
			user: { userInfo }
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `${userInfo.token}`
			}
		};

		const { data } = await Axios.put(`/api/orders/${id}/deliver`, {}, config);

		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};

export const getMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_MY_ORDERS_REQUEST
		});

		const {
			user: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `${userInfo.token}`
			}
		};
		const { data } = await Axios.get("/api/orders/myorders", config);

		dispatch({
			type: GET_MY_ORDERS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: GET_MY_ORDERS_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};

export const getAllOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_ALL_ORDERS_REQUEST
		});

		const {
			user: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `${userInfo.token}`
			}
		};

		const { data } = await Axios.get("/api/orders", config);

		dispatch({
			type: GET_ALL_ORDERS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: GET_ALL_ORDERS_FAIL,
			payload: error.response.data.message || error.message
		});
	}
};

export const resetOrderDetails = () => async (dispatch, getState) => {
	dispatch({
		type: ORDER_DETAILS_RESET
	});
};
