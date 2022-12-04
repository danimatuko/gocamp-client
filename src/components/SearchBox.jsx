import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
	const [keyword, setKeyword] = useState("");

	const history = useHistory();

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/products/search=${keyword}`);
		} else {
			history.push("/");
		}
		setKeyword("");
	};

	return (
		<Form onSubmit={submitHandler} className="d-flex">
			<Form.Control
				size="sm"
				value={keyword}
				type="text"
				name="search"
				placeholder="Search products..."
				onChange={(e) => setKeyword(e.target.value)}
			></Form.Control>

			<Button type="submit" variant="outline-success" className="p-2">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
