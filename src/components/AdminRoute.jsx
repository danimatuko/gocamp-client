import React from "react";
import { Route, Redirect } from "react-router-dom";
import store from "../redux/store";

const AdminRoute = ({ component: Component, ...rest }) => {
	const userInfo = store.getState().user.userInfo;
	const isAdmin = userInfo && userInfo.isAdmin;
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAdmin) {
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

export default AdminRoute;
