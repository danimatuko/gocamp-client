import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTopRatedProducts } from "../redux/product/productActions";
import Loader from "./Loader";
import Message from "./Message";

const TopRatedProducts = () => {
	const { topRatedProducts, loading, error } = useSelector((state) => state.productsTopRated);
	const productList = useSelector((state) => state.productList);
	const { page } = productList;
	const dispatch = useDispatch();
	const nameLength = window.innerWidth <= 768 ? 45 : 20;

	useEffect(() => {
		dispatch(getTopRatedProducts());
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger" text={error} />
	) : (
		page === 1 && (
			<>
				<h1 className="mb-3">Top Rated</h1>
				<Carousel pause="hover" variant="dark" className="mb-3">
					{topRatedProducts.map((product) => (
						<Carousel.Item key={product._id} style={{ height: "500px" }}>
							<Link to={`/product/${product._id}`}>
								<Image
									className="d-block mx-auto"
									src={product.image}
									style={{ height: "80%", width: "60%", objectFit: "contain" }}
								/>
								<Carousel.Caption>
									<h2 className="h5">
										{product.name.length > 35
											? product.name.substring(0, nameLength) + `...`
											: product.name}
									</h2>
								</Carousel.Caption>
							</Link>
						</Carousel.Item>
					))}
				</Carousel>
			</>
		)
	);
};

export default TopRatedProducts;
