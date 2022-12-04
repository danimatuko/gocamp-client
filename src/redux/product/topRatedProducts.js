import * as productTypes from "./productTypes";

const initialState = {
	loading: false,
	error: null,
	topRatedProducts: []
};

const productsTopRatedReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case productTypes.GET_TOP_RATED_PRODUCTS_REQUEST:
			return {
				loading: true
			};
		case productTypes.GET_TOP_RATED_PRODUCTS_SUCCESS:
			return {
				loading: false,
				topRatedProducts: payload
			};
		case productTypes.GET_TOP_RATED_PRODUCTS_FAIL:
			return {
				loading: false,
				error: payload
			};
		default:
			return state;
	}
};

export default productsTopRatedReducer;
