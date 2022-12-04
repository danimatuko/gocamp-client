import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
	const nameLength = window.innerWidth <= 768 ? 50 : 20;

	return (
		<Card className="my-3 p-3 product">
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} style={{ height: "180px", objectFit: "contain" }} />
			</Link>
			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as="div" className="h5">
						{product.name.length > 35
							? product.name.substring(0, nameLength) + `...`
							: product.name}
					</Card.Title>
				</Link>
				<Card.Text as="div">
					<Rating value={product.rating} text={`${product.numReviews} reviews`} />
				</Card.Text>

				<Card.Text as="div">
					<div className="h5">${product.price}</div>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
