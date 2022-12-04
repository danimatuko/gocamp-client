import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import productListReducer from "./product/productReducer";
import productDetailsReducer from "./product/productDetailsReducer";
import cartReducer from "./cart/cartReducer";
import userReducer from "./user/userReducer";
import orderReducer from "./order/orderReducer";
import adminReducer from "./admin/adminReducer";
import productDeleteReducer from "./product/productDeleteReducer";
import productCreateReducer from "./product/productCreateReducer";
import productUpdateReducer from "./product/productUpdateReducer";
import productReviewReducer from "./product/productReviewReducer";
import productSearchReducer from "./product/productSearchReducer";
import productsTopRatedReducer from "./product/topRatedProducts";

const rootReducer = combineReducers({
	productList: productListReducer,
	productCreate: productCreateReducer,
	productDetails: productDetailsReducer,
	productUpdate: productUpdateReducer,
	productDelete: productDeleteReducer,
	productReview: productReviewReducer,
	productSearch: productSearchReducer,
	productsTopRated:productsTopRatedReducer,
	cart: cartReducer,
	user: userReducer,
	admin: adminReducer,
	order: orderReducer
});

const middleware = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
