import React from "react";
import { Route, Redirect } from "react-router-dom";
import store from "../redux/store";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const isAuth = store.getState().user.userInfo;
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuth) {
					return <Component {...rest} {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/login",
								state: {
									from: props.location
								}
							}}
						/>
					);
				}
			}}
		/>
	);
};

export default ProtectedRoute;
