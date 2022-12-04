import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { login } from "../redux/user/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginPage = ({ history, location }) => {
	const user = useSelector((state) => state.user);
	const { loading, error, userInfo } = user;
	const dispatch = useDispatch();
	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		if (userInfo) history.push(redirect);
	}, [history, userInfo, redirect]);

	// LOCAL STATE
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant="danger" text={error} />}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						name="email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary" className="mt-3">
					Sign In
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					New Customer?
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
						Sign Up
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginPage;
