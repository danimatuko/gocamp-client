import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getAllProducts, deleteProduct, createProduct } from "../redux/product/productActions";
import Paginate from "../components/Paginate";

const ProductsListPage = ({ history, location }) => {
	const dispatch = useDispatch();

	/* PRODUCTS LIST REDUCER */
	const { loading, error, products, totalPages } = useSelector((state) => state.productList);
	const { newProduct } = useSelector((state) => state.productUpdate);
	/* PRODUCT DELETE  REDUCER*/
	const {
		loading: loadingDelete,
		error: errorDelete,
		deleteSuccess
	} = useSelector((state) => state.productDelete);
	/* PRODUCT CREATE REDUCER*/
	const {
		loading: loadinCreate,
		error: errorCreate,
		product
	} = useSelector((state) => state.productCreate);

	const pageNumber = location.search.split("=")[1] || 1;

	useEffect(() => {
		dispatch(getAllProducts(pageNumber));
	}, [dispatch, deleteSuccess, product, newProduct, pageNumber]);

	const addProduct = () => {
		dispatch(createProduct());
	};

	return (
		<>
			<Row className="mb-3">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-end">
					<Button onClick={() => addProduct()}>
						<i className="fas fa-plus me-1"></i>Add Product
					</Button>
				</Col>
			</Row>

			{loading || loadingDelete || loadinCreate ? (
				<Loader />
			) : error || errorDelete || errorCreate ? (
				<Message variant="danger" text={error || errorDelete || errorCreate} />
			) : (
				<>
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>${product.price}</td>
									<td>{product.name}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>

									<td>
										<Button
											as={Link}
											to={`/admin/product/${product._id}/edit`}
											className="btn-sm"
										>
											<i className="fas fa-edit"></i>
										</Button>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => dispatch(deleteProduct(product._id))}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate page={pageNumber} total={totalPages} />
				</>
			)}
		</>
	);
};

export default ProductsListPage;
