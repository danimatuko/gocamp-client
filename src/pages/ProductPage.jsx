import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	ListGroupItem,
	Button,
	Form,
	FormGroup,
	FormLabel,
	FormControl
} from "react-bootstrap";
import Rating from "../components/Rating";
import { getProductDetails, createProductReview } from "../redux/product/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { addToCart } from "../redux/cart/cartActions";

const ProductPage = ({ match, history }) => {
	const { userInfo } = useSelector((state) => state.user);
	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;
	const {
		review,
		error: reviewError
	} = useSelector((state) => state.productReview);

	const dispatch = useDispatch();
	const productId = product._id;
	// local state for the quntitiy
	const [qty, setQty] = useState(0);

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	useEffect(() => {
		dispatch(getProductDetails(match.params.id));
	}, [match, dispatch, review]);

	const handleAddToCart = () => {
		dispatch(addToCart(productId, Number(qty)));
		//history.push(`/cart/${match.params.id}/?qty=${qty}`);
		history.push("/cart");
	};

	const handleReview = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				name: userInfo.first_name + " " + userInfo.last_name,
				rating,
				comment
			})
		);
	};

	return (
		<>
			<Link className="btn btn-dark my-3" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message />
			) : (
				<>
					<Row>
						<Col lg={6}>
							<Image src={product.image} fluid />
						</Col>
						<Col lg={3}>
							<ListGroup variant="flush">
								<ListGroupItem>
									<h1 className="h3">{product.name}</h1>
								</ListGroupItem>
								<div className="d-flex px-2">
									<Rating value={product.rating} />
									{<span className="ms-1">{product.reviews.length} reviews</span>}
								</div>

								<ListGroupItem>Description: {product.description}</ListGroupItem>
							</ListGroup>
						</Col>
						<Col lg={3}>
							<ListGroup>
								<ListGroupItem>Price: ${product.price}</ListGroupItem>
								<ListGroupItem>
									Status:{" "}
									{product.countInStock > 0 ? (
										<span>In Stock</span>
									) : (
										<span className="text-danger">Out Of Stock</span>
									)}
								</ListGroupItem>
								{product.countInStock > 0 && (
									<ListGroupItem>
										<Row className="align-items-center">
											<Col sm={3} className="me-2">
												Quantity:
											</Col>
											<Col sm={4}>
												<Form.Control
													placeholder="0"
													size="sm"
													type="number"
													min="0"
													max={product.countInStock}
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												></Form.Control>
											</Col>
										</Row>
									</ListGroupItem>
								)}
								<ListGroupItem>
									<Button
										className="w-100"
										type="button"
										disabled={product.countInStock === 0 || qty === 0}
										onClick={(e) => handleAddToCart()}
									>
										Add to cart
									</Button>
								</ListGroupItem>
							</ListGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2 className="mt-5">Reviews</h2>
							{product.reviews.length === 0 && (
								<Message variant="warning" text="No reviews" />
							)}
							<ListGroup variant="flush">
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroupItem>
									<h2>Write a review</h2>
									{reviewError && <Message variant="danger" text={reviewError} />}
									{userInfo ? (
										<Form onSubmit={handleReview}>
											<FormGroup>
												<FormLabel>Rating</FormLabel>
												<FormControl
													as="select"
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value="">Select</option>
													<option value="1">1 - Poor</option>
													<option value="2">2 - Fair</option>
													<option value="3">3 - Good</option>
													<option value="4">4 - Very Good</option>
													<option value="5">5 - Excellent</option>
												</FormControl>
											</FormGroup>
											<Form.Group>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as="textarea"
													row="3"
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Form.Group className="mt-3">
												<Button type="submit" variant="primary">
													Submit
												</Button>
											</Form.Group>
										</Form>
									) : (
										<p>
											<Link to="/login">Sign In</Link> to write a review
										</p>
									)}
								</ListGroupItem>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductPage;
