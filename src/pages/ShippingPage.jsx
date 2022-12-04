import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../redux/cart/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const dispatch = useDispatch();

	const initialState = {
		street: shippingAddress.street,
		city: shippingAddress.city,
		postalCode: shippingAddress.postalCode,
		country: shippingAddress.country
	};

	const [address, setAddress] = useState(initialState);
	const { street, city, postalCode, country } = address;

	const handleChange = ({ name, value }) => {
		setAddress({ ...address, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress(address));
		history.push("/payment");
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="street">
					<Form.Label>Street</Form.Label>
					<Form.Control
						name="street"
						type="text"
						value={street}
						onChange={(e) => handleChange(e.target)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						name="city"
						type="text"
						value={city}
						onChange={(e) => handleChange(e.target)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="postalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						name="postalCode"
						type="text"
						value={postalCode}
						onChange={(e) => handleChange(e.target)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						name="country"
						type="text"
						value={country}
						onChange={(e) => handleChange(e.target)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingPage;
