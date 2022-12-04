import {
	CREATE_ORDER_FAIL,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	GET_ORDER_DETAILS_FAIL,
	GET_ORDER_DETAILS_REQUEST,
	GET_ORDER_DETAILS_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_RESET,
	ORDER_DETAILS_RESET,
	GET_MY_ORDERS_REQUEST,
	GET_MY_ORDERS_SUCCESS,
	GET_MY_ORDERS_FAIL,
	GET_ALL_ORDERS_REQUEST,
	GET_ALL_ORDERS_FAIL,
	GET_ALL_ORDERS_SUCCESS,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL
} from "./types";

const initialState = {
	loading: false,
	error: null,
	orderDetails: {},
	myOrders: [],
	orders: []
};

const orderReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case CREATE_ORDER_REQUEST:
		case GET_ORDER_DETAILS_REQUEST:
		case ORDER_PAY_REQUEST:
		case GET_MY_ORDERS_REQUEST:
		case GET_ALL_ORDERS_REQUEST:
		case ORDER_DELIVER_REQUEST:
			return {
				...state,
				loading: true
			};
		case CREATE_ORDER_SUCCESS:
		case GET_ORDER_DETAILS_SUCCESS:
		case ORDER_PAY_SUCCESS:
		case ORDER_DELIVER_SUCCESS:
			return {
				...state,
				loading: false,
				orderDetails: payload
			};
		case CREATE_ORDER_FAIL:
		case GET_ORDER_DETAILS_FAIL:
		case ORDER_PAY_FAIL:
		case GET_ALL_ORDERS_FAIL:
		case ORDER_DELIVER_FAIL:
			return {
				...state,
				loading: false,
				error: payload
			};

		case ORDER_PAY_RESET:
		case ORDER_DETAILS_RESET:
			return {
				...state,
				orderDetails: {}
			};

		case GET_MY_ORDERS_SUCCESS:
			return {
				...state,
				myOrders: payload,
				loading: false
			};
		case GET_ALL_ORDERS_SUCCESS:
			return {
				...state,
				orders: payload,
				loading: false
			};
		case GET_MY_ORDERS_FAIL:
			return {
				...state,
				myOrders: [],
				loading: false
			};

		default:
			return state;
	}
};

export default orderReducer;
