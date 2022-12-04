import * as productTypes from "./productTypes";

const initialState = {
	loading: false,
	error: null,
	product: null
};

const productCreateReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case productTypes.CREATE_PRODUCT_REQUEST:
			return {
				loading: true
			};
		case productTypes.CREATE_PRODUCT_SUCCESS:
			return {
				loading: false,
				product: payload
			};

		case productTypes.CREATE_PRODUCT_FAIL:
			return {
				loading: false,
				error: payload
			};
		default:
			return state;
	}
};

export default productCreateReducer;
