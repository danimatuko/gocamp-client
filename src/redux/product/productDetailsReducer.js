import * as productTypes from "./productTypes";

const initialState = {
	product: {
		reviews: []
	},
	loading: false
};

const productDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case productTypes.GET_PRODUCT_DETAILS:
			return {
				...state,
				loading: true
			};
		case productTypes.GET_PRODUCT_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				product: action.payload
			};
		case productTypes.GET_PRODUCT_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export default productDetailsReducer;
