import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { register } from "../redux/user/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const RegisterPage = ({ history, location }) => {
	const user = useSelector((state) => state.user);
	const { loading, error, userInfo } = user;
	const dispatch = useDispatch();
	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		if (userInfo) history.push(redirect);
	}, [history, userInfo, redirect]);

	// LOCAL STATE
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Password must match");
		} else {
			dispatch(register(firstName, lastName, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{error && <Message variant="danger" text={error} />}
			{message && <Message variant="danger" text={message} />}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="firstName">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						name="firstName"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="lastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						name="lastName"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					></Form.Control>
				</Form.Group>
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
				<Form.Group controlId="confirmPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						name="confirm_password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary" className="mt-3">
					Sign In
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Have an account?
					<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Sign In </Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterPage;
