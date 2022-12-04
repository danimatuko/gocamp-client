import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getAllOrders, getOrderDetails } from "../redux/order/orederActions";

const OrdersListPage = ({ history }) => {
	const dispatch = useDispatch();
	const { orders, loading, error } = useSelector((state) => state.order);
	useEffect(() => {
		dispatch(getAllOrders());
	}, [dispatch]);

	const viewDetails = (id) => {
		dispatch(getOrderDetails(id));
		history.push(`/order/${id}`);
	};

	return (
		<>
			<div>
				<Row>
					<Col>
						<h2>Orders</h2>
						{loading ? (
							<Loader />
						) : error ? (
							<Message variant="danger" text={error} />
						) : !orders.length ? (
							<Message variant="warning" text="No orders" />
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
									{orders.map((order) => (
										<tr key={order._id}>
											<td>{order._id}</td>
											<td>{order.createdAt.substring(0, 10)}</td>
											<td>${order.totalPrice}</td>
											<td>
												{order.isPaid ? (
													order.paidAt.substring(0, 10)
												) : (
													<i
														className="fas fa-times"
														style={{ color: "red" }}
													></i>
												)}
											</td>
											<td>
												{order.deliveredAt ? (
													order.deliveredAt.substring(0, 10)
												) : (
													<i
														className="fas fa-times"
														style={{ color: "red" }}
													></i>
												)}
											</td>
											<td>
												<Button onClick={() => viewDetails(order._id)}>
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
		</>
	);
};

export default OrdersListPage;
