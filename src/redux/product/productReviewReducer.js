import * as productTypes from "./productTypes";

const initialState = {
	loading: false,
	review: {},
	error: null
};

const productReviewReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case productTypes.CREATE_PRODUCT_REVIEW_REQUEST:
			return {
				loading: true
			};
		case productTypes.CREATE_PRODUCT_REVIEW_SUCCESS:
			return {
				loading: false,
				review: payload
			};
		case productTypes.CREATE_PRODUCT_REVIEW_FAIL:
			return {
				loading: false,
				error: payload
			};
		default:
			return state;
	}
};

export default productReviewReducer;
