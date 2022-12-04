import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getProductDetails, updateProduct } from "../redux/product/productActions";
import Axios from "axios";

const ProductEditPage = ({ match, history }) => {
	const productId = match.params.id;
	const { product, loading, error } = useSelector((state) => state.productDetails);
	const { userInfo } = useSelector((state) => state.user);
	const { loading: loadingUpdate, error: errorUpdate } = useSelector(
		(state) => state.productUpdate
	);
	const dispatch = useDispatch();

	// LOCAL STATE
	const initialState = {
		name: "",
		price: 0,
		image: "",
		brand: "",
		category: "",
		countInStock: 0,
		description: ""
	};

	const [uploading, setUploading] = useState(false);

	const [updatedProduct, setUpdatedProduct] = useState(initialState);

	useEffect(() => {
		if (productId !== product._id) {
			dispatch(getProductDetails(match.params.id));
		} else {
			setUpdatedProduct(product);
		}
	}, [dispatch, match.params.id, product, productId]);

	const handleChange = ({ name, value }) => {
		setUpdatedProduct({ ...updatedProduct, [name]: value });
	};

	const uploadFile = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `${userInfo.token}`
				}
			};

			const { data } = await Axios.post("/api/upload", formData, config);
			setUpdatedProduct({ ...updatedProduct, image: data });
			setUploading(false);
		} catch (error) {
			setUploading(false);
			console.log(error);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateProduct(updatedProduct));
		dispatch(getProductDetails(productId));

		history.push("/admin/products");
	};

	const { name, price, image, brand, category, countInStock, description } = updatedProduct;

	return (
		<FormContainer>
			<h1>Edit Product</h1>
			{error || (errorUpdate && <Message variant="danger" text={error | errorUpdate} />)}
			{loading || (loadingUpdate && <Loader />)}
			<Form onSubmit={submitHandler} encType="multipart/form-data">
				<Form.Group controlId="name">
					<Form.Label> Name</Form.Label>
					<Form.Control
						name="name"
						type="text"
						value={name}
						onChange={(e) => handleChange(e.target)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="price">
					<Form.Label>Price</Form.Label>
					<Form.Control
						type="number"
						name="price"
						value={price}
						onChange={(e) => handleChange(e.target)}
					></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Image URL</Form.Label>
					<Form.Control
						name="image"
						type="text"
						value={image}
						onChange={(e) => handleChange(e.target)}
					></Form.Control>
					<Form.Group>
						<Form.Label>Image Upload</Form.Label>
						<Form.File
							accept="image/jpg, image/jpeg, image/png"
							type="file"
							onChange={(e) => handleChange(uploadFile(e))}
						></Form.File>
						{uploading && <Loader />}
					</Form.Group>
				</Form.Group>
				<Form.Label>Brand</Form.Label>
				<Form.Group controlId="brand">
					<Form.Control
						name="brand"
						type="text"
						value={brand}
						onChange={(e) => handleChange(e.target)}
					></Form.Control>
					{uploading && <Loader />}
				</Form.Group>
				<Form.Label>Count In Stock</Form.Label>
				<Form.Group controlId="countInStock">
					<Form.Control
						name="countInStock"
						type="number"
						value={countInStock}
						onChange={(e) => handleChange(e.target)}
					></Form.Control>
				</Form.Group>
				<Form.Label>Category</Form.Label>
				<Form.Group controlId="category">
					<Form.Control
						name="category"
						type="text"
						value={category}
						onChange={(e) => handleChange(e.target)}
					></Form.Control>
				</Form.Group>
				<Form.Label>Description</Form.Label>
				<Form.Group controlId="description">
					<Form.Control
						as="textarea"
						rows={5}
						name="description"
						type="text"
						value={description}
						onChange={(e) => handleChange(e.target)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary" className="mt-3">
					Update
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ProductEditPage;
