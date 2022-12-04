import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../redux/product/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductSearchResults = ({ match }) => {
	const { products, loading, error } = useSelector((state) => state.productSearch);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(searchProduct(match.params.keyword));
	}, [dispatch, match.params.keyword]);

	return (
		<div>
			<h1> ({products && products.length}) Resutls Found</h1>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger" text={error} />
			) : (
				<>
					{products.length < 1 && <Message variant="warning" text={"No resutls found"} />}
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
				</>
			)}
		</div>
	);
};

export default ProductSearchResults;
