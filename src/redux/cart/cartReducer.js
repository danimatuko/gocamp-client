import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_REMOVE_ONE_QTY,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_EMPTY
} from "./types";

const initialState = {
	cartItems: localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [],
	shippingAddress: localStorage.getItem("shippingAddress")
		? JSON.parse(localStorage.getItem("shippingAddress"))
		: "",
	paymentMethod: localStorage.getItem("paymentMethod")
		? JSON.parse(localStorage.getItem("paymentMethod"))
		: ""
};

const cartReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case CART_ADD_ITEM: {
			const newItem = payload;
			const itemExist = state.cartItems.find((item) => item._id === newItem._id);

			if (itemExist) {
				newItem.qty += itemExist.qty;
				return {
					...state,
					cartItems: state.cartItems.map((item) => (item === itemExist ? newItem : item))
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, newItem]
				};
			}
		}
		case CART_REMOVE_ONE_QTY:
			{
				const id = payload;
				const itemExist = state.cartItems.find((item) => item._id === id);

				if (itemExist) {
					const editedItem = { ...itemExist };
					editedItem.qty -= 1;

					return {
						...state,
						cartItems: state.cartItems.map((item) =>
							item === itemExist ? editedItem : item
						)
					};
				}
			}
			break;
		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: payload
			};
		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: payload
			};

		case CART_REMOVE_ITEM: {
			return {
				...state,
				cartItems: state.cartItems.filter((item) => item._id !== payload)
			};
		}

		case CART_EMPTY: {
			return {
				...state,
				cartItems: []
			};
		}
		default:
			return state;
	}
};

export default cartReducer;
