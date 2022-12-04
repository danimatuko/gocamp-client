import React from "react";
import { Nav, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<Nav className="justify-conetent-between mb-4 flex-nowrap checkout-steps">
			<Nav.Item>
				{step1 ? (
					<NavLink as={Link} to="/login">
						Sign In
					</NavLink>
				) : (
					<NavLink disabled>Sign In</NavLink>
				)}
			</Nav.Item>
			<Nav.Item>
				{step2 ? (
					<NavLink as={Link} to="/shipping">
						Shipping
					</NavLink>
				) : (
					<NavLink disabled>Shipping</NavLink>
				)}
			</Nav.Item>
			<Nav.Item>
				{step3 ? (
					<NavLink as={Link} to="/payment">
						Payment
					</NavLink>
				) : (
					<NavLink disabled>Payment</NavLink>
				)}
			</Nav.Item>

			<Nav.Item>
				{step4 ? (
					<NavLink as={Link} to="/place-order">
						Place Order
					</NavLink>
				) : (
					<NavLink disabled>Place Order</NavLink>
				)}
			</Nav.Item>
		</Nav>
	);
};

export default CheckoutSteps;
