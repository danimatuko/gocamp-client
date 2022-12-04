import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getMyOrders, getOrderDetails } from "../redux/order/orederActions";

const ProfilePage = ({ history }) => {
	const dispatch = useDispatch();
	const order = useSelector((state) => state.order);
	const { myOrders, loading, error } = order;

	useEffect(() => {
		dispatch(getMyOrders());
	}, [dispatch]);

	const viewDetails = (id) => {
		dispatch(getOrderDetails(id));
		history.push(`/order/${id}`);
	};

	return (
		<div>
			<Row>
				<Col md={4}></Col>
				<Col md={8}>
					<h2>MY ORDERS</h2>
					{loading ? (
						<Loader />
					) : error ? (
						<Message variant="danger" text={error} />
					) : !myOrders.length ? (
						<Message variant="warning" text="You have no orders" />
					) : (
						<Table striped bordered hover responsive className="table-sm">
							<thead>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>PAID</th>
									<th>DELIVERED</th>
								</tr>
							</thead>
							<tbody className="text-center">
								{myOrders.map((myorder) => (
									<tr key={myorder._id}>
										<td>{myorder._id}</td>
										<td>{myorder.createdAt.substring(0, 10)}</td>
										<td>${myorder.totalPrice}</td>
										<td>
											{myorder.isPaid ? (
												myorder.paidAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: "red" }}
												></i>
											)}
										</td>
										<td>
											{myorder.deliveredAt ? (
												myorder.deliveredAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: "red" }}
												></i>
											)}
										</td>
										<td>
											<Button onClick={() => viewDetails(myorder._id)}>
												Details
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default ProfilePage;
