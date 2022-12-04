import React, { useEffect, useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../redux/cart/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentPage = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const dispatch = useDispatch();

	useEffect(() => {
		if (shippingAddress === "") history.push("/shipping");
	}, [shippingAddress,history]);

	const [paymentMethod, setPaymentMethod] = useState("paypal");

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push("/place-order");
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={handleSubmit}>
				<Col>
					<Form.Group>
						<Form.Label as="legend">Select Method</Form.Label>
						<Form.Check
							label="Paypal or credit card"
							name="paymentMethod"
							type="radio"
							value={paymentMethod}
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Form.Group>
				</Col>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentPage;
