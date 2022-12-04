import React, { useEffect } from "react";
import { Image, ListGroup, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder, resetOrderDetails } from "../redux/order/orederActions";

const PlaceOrderPage = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress, cartItems } = cart;
	const dispatch = useDispatch();

	// add 2 numbers after the . even if it's 0
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	// calculate total
	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	cart.shippingPrice = addDecimals(Number(cart.itemsPrice > 100 ? 0 : 10));
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
	cart.totalPrice = Number(
		Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
	).toFixed(2);

	const { orderDetails, error } = useSelector((state) => state.order);

	useEffect(() => {
		orderDetails._id && !orderDetails.isPaid
			? history.push(`/order/${orderDetails._id}`)
			: dispatch(resetOrderDetails());
	}, [dispatch, history, orderDetails._id, orderDetails.isPaid]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice
			})
		);
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>

								{` ${shippingAddress.street}, ${shippingAddress.city},
								 ${shippingAddress.postalCode}, ${shippingAddress.country}`}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: {cart.paymentMethod}</strong>
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cartItems.length === 0 ? (
								<Message text="Your cart is empty" variant="warning" />
							) : (
								<ListGroup variant="flush">
									{cartItems.map((item) => (
										<ListGroup.Item key={item._id}>
											<Row>
												<Col md={1}>
													<Image src={item.image} alt={item.name} fluid />
												</Col>
												<Col md={6}>
													<Link to={`/product/${item._id}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} =
													{Number(item.qty * item.price).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Order Summary</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Items</Col>
								<Col>${cart.itemsPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Shipping</Col>
								<Col>${cart.shippingPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Tax</Col>
								<Col>${cart.taxPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Total</Col>
								<Col>${cart.totalPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							{error && <Message variant="danger" text={error} />}
							<Button
								type="button"
								className="w-100"
								disabled={cartItems.length === 0}
								onClick={() => placeOrderHandler()}
							>
								Place Order
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderPage;
