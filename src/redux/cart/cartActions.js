import Axios from "axios";
import {
	CART_ADD_ITEM,
	CART_EMPTY,
	CART_REMOVE_ITEM,
	CART_REMOVE_ONE_QTY,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS
} from "./types";

export const addToCart = (id, qty) => (dispatch, getState) => {
	// make sure the product exist on the DB
	Axios.get(`/api/products/${id}`)
		.then(({ data }) => {
			dispatch({
				type: CART_ADD_ITEM,
				payload: {
					_id: data._id,
					name: data.name,
					image: data.image,
					price: data.price,
					countInStock: data.countInStock,
					qty: qty
				}
			});
			localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
		})
		.catch((err) => console.log(err, "error"));
};

export const removeOne = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ONE_QTY,
		payload: id
	});
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItem = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id
	});
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (address) => (dispatch, getState) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: address
	});
	localStorage.setItem("shippingAddress", JSON.stringify(address));
};

export const savePaymentMethod = (paymentMethod) => (dispatch, getState) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: paymentMethod
	});
	localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};

export const emptyCart = () => async (dispatch, getState) => {
	dispatch({
		type: CART_EMPTY
	});
	localStorage.removeItem("cartItems");
};
