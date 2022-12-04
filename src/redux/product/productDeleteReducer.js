import * as productTypes from "./productTypes";

const initialState = {
	loading: false,
	error: null,
	deleteSuccess: false
};

const productDeleteReducer = (state = initialState, action) => {
	switch (action.type) {
		case productTypes.DELETE_PRODUCT_REQUEST:
			return {
				loading: true
			};
		case productTypes.GET_ALL_PRODUCTS_SUCCESS:
			return {
				loading: false,
				deleteSuccess: true
			};
		case productTypes.DELETE_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export default productDeleteReducer;
