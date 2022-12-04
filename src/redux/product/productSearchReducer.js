import * as productTypes from "./productTypes";

const initialState = {
	loading: false,
	products: [],
	error: null
};

const productSearchReducer = (state = initialState, action) => {
	switch (action.type) {
		case productTypes.SEARCH_PRODUCT_REQUEST:
			return {
				loading: true
			};
		case productTypes.SEARCH_PRODUCT_SUCCESS:
			return {
				loading: false,
				products: action.payload
			};
		case productTypes.SEARCH_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export default productSearchReducer;
