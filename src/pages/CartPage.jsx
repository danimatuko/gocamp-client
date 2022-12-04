import React from "react";
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { addToCart, removeOne, removeItem } from "../redux/cart/cartActions";

const CartPage = ({ history }) => {
	const { cartItems } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const checkoutHandler = () => {
		history.push("/login?redirect=shipping");
	};

	const isDesktop = window.innerWidth <= 768;

	return (
		<Row>
			<Col md={8}>
				<h1 className="mb-5">Shopping Cart</h1>
				{!cartItems.length && <Message variant="warning" text="Your cart is empty" />}
				<ListGroup>
					{cartItems.map((item) => (
						<ListGroupItem key={item._id}>
							<Row className="align-items-center">
								<Col md={2}>
									<Image src={item.image} fluid />
								</Col>
								<Col md={3}>
									<Link to={`/product/${item._id}`}>{item.name}</Link>
								</Col>
								<Col md={3}>${item.price}</Col>
								<Col md={2}>
									<Row>
										<Button
											disabled={item.qty === Number(item.countInStock)}
											variant="light"
											onClick={(e) => dispatch(addToCart(item._id, 1))}
										>
											<i className="fas fa-chevron-up"></i>
										</Button>
										<div className="text-center">
											{item.qty > 0 ? item.qty : 1}
										</div>

										<Button
											disabled={item.qty === 1}
											variant="light"
											onClick={(e) => dispatch(removeOne(item._id))}
										>
											<i className="fas fa-chevron-down"></i>
										</Button>
									</Row>
								</Col>
								<Col sm={12} md={2}>
									<Button
										size="sm"
										className="d-block mx-auto"
										type="button"
										variant={isDesktop ? "outline-dark" : "light"}
										onClick={() => dispatch(removeItem(item._id))}
									>
										{isDesktop ? (
											<span>Remove</span>
										) : (
											<i className="fas fa-trash"></i>
										)}
									</Button>
								</Col>
								<Col md={2}></Col>
							</Row>
						</ListGroupItem>
					))}
				</ListGroup>
			</Col>

			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroupItem>
							<h2 className="h4 pt-2">
								Subtotal ( {cartItems.reduce((acc, item) => acc + item.qty, 0)})
								Items
							</h2>
						</ListGroupItem>
						<ListGroupItem>
							Price: $
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroupItem>
						<ListGroupItem>
							<Button
								type="button"
								variant="dark"
								className="w-100"
								disabled={!cartItems.length}
								onClick={checkoutHandler}
							>
								Procced to checkout
							</Button>
						</ListGroupItem>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartPage;
