import * as productTypes from "./productTypes";
import Axios from "axios";

export const getAllProducts = (page) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: productTypes.GET_ALL_PRODUCTS_REQUEST
			});

			const { data } = await Axios.get(`/api/products?page=${page}`);
			dispatch({
				type: productTypes.GET_ALL_PRODUCTS_SUCCESS,
				payload: data
			});
		} catch (error) {
			dispatch({
				type: productTypes.GET_ALL_PRODUCTS_FAIL,
				payload: error.response.data.message || error.message
			});
		}
	};
};

export const getProductDetails = (id) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: productTypes.GET_PRODUCT_DETAILS
			});

			const { data } = await Axios.get(`/api/products/${id}`);

			dispatch({
				type: productTypes.GET_PRODUCT_DETAILS_SUCCESS,
				payload: data
			});
		} catch (error) {
			dispatch({
				type: productTypes.GET_PRODUCT_DETAILS_FAIL,
				payload: error.response.data.message || error.message
			});
		}
	};
};
// create a sample product (no need to pass a product).
// The details will be updated in another request
export const createProduct = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: productTypes.CREATE_PRODUCT_REQUEST
			});

			const {
				user: { userInfo }
			} = getState();

			const config = {
				headers: {
					Authorization: `${userInfo.token}`
				}
			};
			const { data } = await Axios.post(`/api/products`, {}, config);

			dispatch({
				type: productTypes.CREATE_PRODUCT_SUCCESS,
				payload: data
			});

			window.location.href = `/admin/product/${data._id}/edit`;
		} catch (error) {
			dispatch({
				type: productTypes.CREATE_PRODUCT_FAIL,
				payload: error.response.data.message || error.message
			});
		}
	};
};

export const updateProduct = (product) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: productTypes.UPDATE_PRODUCT_REQUEST
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
			const { data } = await Axios.put(`/api/products/${product._id}`, product, config);

			dispatch({
				type: productTypes.UPDATE_PRODUCT_SUCCESS,
				payload: data
			});
		} catch (error) {
			dispatch({
				type: productTypes.UPDATE_PRODUCT_FAIL,
				payload: error.response.data.message || error.message
			});
		}
	};
};

export const deleteProduct = (id) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: productTypes.DELETE_PRODUCT_REQUEST
			});

			const {
				user: { userInfo }
			} = getState();

			const config = {
				headers: {
					Authorization: `${userInfo.token}`
				}
			};
			await Axios.delete(`/api/products/${id}`, config);

			dispatch({
				type: productTypes.DELETE_PRODUCT_SUCCESS
			});
		} catch (error) {
			dispatch({
				type: productTypes.DELETE_PRODUCT_FAIL,
				payload: error.response.data.message || error.message
			});
		}
	};
};

export const createProductReview = (productId, review) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: productTypes.CREATE_PRODUCT_REVIEW_REQUEST
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
			const { data } = await Axios.post(`/api/products/${productId}/reviews`, review, config);

			dispatch({
				type: productTypes.CREATE_PRODUCT_REVIEW_SUCCESS,
				payload: data
			});
		} catch (error) {
			dispatch({
				type: productTypes.CREATE_PRODUCT_REVIEW_FAIL,
				payload: error.response.data.message || error.message
			});
		}
	};
};

export const searchProduct = (keyword) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: productTypes.SEARCH_PRODUCT_REQUEST
			});

			const { data } = await Axios.get(`/api/products/search=${keyword}`);

			dispatch({
				type: productTypes.SEARCH_PRODUCT_SUCCESS,
				payload: data
			});
		} catch (error) {
			dispatch({
				type: productTypes.SEARCH_PRODUCT_FAIL,
				payload: error.response.data.message || error.message
			});
		}
	};
};

export const getTopRatedProducts = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: productTypes.GET_TOP_RATED_PRODUCTS_REQUEST
			});

			const { data } = await Axios.get(`/api/products/top-rated`);

			dispatch({
				type: productTypes.GET_TOP_RATED_PRODUCTS_SUCCESS,
				payload: data
			});
		} catch (error) {
			dispatch({
				type: productTypes.GET_TOP_RATED_PRODUCTS_FAIL,
				payload: error.response.data.message || error.message
			});
		}
	};
};
