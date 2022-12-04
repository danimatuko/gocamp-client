import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { editUser, getUserById } from "../redux/admin/adminActions";

const EditUserPage = ({ match, history }) => {
	const admin = useSelector((state) => state.admin);
	const { loading, error, userProfile } = admin;
	const dispatch = useDispatch();

	// LOCAL STATE
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (match.params.id !== userProfile._id) {
			dispatch(getUserById(match.params.id));
		} else {
			setFirstName(userProfile.first_name);
			setLastName(userProfile.last_name);
			setEmail(userProfile.email);
			setIsAdmin(userProfile.isAdmin);
		}
	}, [dispatch, match.params.id, userProfile]);

	const submitHandler = (e) => {
		e.preventDefault();
		const user = {
			_id: userProfile._id,
			first_name: firstName,
			last_name: lastName,
			isAdmin
		};
		dispatch(editUser(user));
		history.push("/admin/users");
	};

	return (
		<FormContainer>
			<h1>Edit User</h1>
			{error && <Message variant="danger" text={error} />}
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
						disabled
						name="email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="isAdmin">
					<Form.Check
						label="Admin"
						name="isAdmin"
						type="checkbox"
						checked={isAdmin}
						onChange={(e) => setIsAdmin(e.target.checked)}
					></Form.Check>
				</Form.Group>

				<Button type="submit" variant="primary" className="mt-3">
					Submit
				</Button>
			</Form>
		</FormContainer>
	);
};

export default EditUserPage;
