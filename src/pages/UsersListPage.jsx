import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { deleteUser, getUsers } from "../redux/admin/adminActions";

const UsersListPage = () => {
	const dispatch = useDispatch();
	const { users, loading, error, userProfile } = useSelector((state) => state.admin);
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch, userProfile]);

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger" text={error} />
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>
									{user.first_name} {user.last_name}
								</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td className="text-center">
									{user.isAdmin ? (
										<i className="fa fa-check" style={{ color: "green" }}></i>
									) : (
										<i className="fa fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<Button
										as={Link}
										to={`/admin/user/${user._id}/edit`}
										className="btn-sm"
									>
										<i className="fas fa-edit"></i>
									</Button>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => dispatch(deleteUser(user._id))}
									>
										<i className="fas fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UsersListPage;
