import * as productTypes from "./productTypes";

const initialState = {
	loading: false,
	error: null,
	newProduct: null
};

const productUpdateReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case productTypes.UPDATE_PRODUCT_REQUEST:
			return {
				loading: true
			};
		case productTypes.UPDATE_PRODUCT_SUCCESS:
			return {
				loading: false,
				newProduct: payload
			};
		case productTypes.UPDATE_PRODUCT_FAIL:
			return {
				loading: false,
				error: payload
			};
		default:
			return state;
	}
};

export default productUpdateReducer;
