import * as productTypes from "./productTypes";

const initialState = {
	loading: false,
	products: [],
	page: 1,
	sumOfProducts: null,
	totalPages: 1,
	resultsPerPage: null,
	error: null
};

const productListReducer = (state = initialState, action) => {
	switch (action.type) {
		case productTypes.GET_ALL_PRODUCTS_REQUEST:
			return {
				loading: true
			};
		case productTypes.GET_ALL_PRODUCTS_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				page: action.payload.page,
				sumOfProducts: action.payload.sumOfProducts,
				totalPages: action.payload.totalPages,
				resultsPerPage: action.payload.resultsPerPage
			};
		case productTypes.GET_ALL_PRODUCTS_FAIL:
			return {
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export default productListReducer;
