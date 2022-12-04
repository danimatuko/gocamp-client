import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/user/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" className="nowrap" collapseOnSelect>
				<Container>
					<Navbar.Brand as={Link} to="/">
						GOCAMP
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<SearchBox />
						<Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
							<Nav.Link as={Link} to="/">
								<i className="fas fa-home me-1"></i>Home
							</Nav.Link>
							<Nav.Link as={Link} to="cart">
								<i className="fas fa-shopping-cart me-1"></i>Cart
							</Nav.Link>
							{userInfo ? (
								<NavDropdown title={`${userInfo.first_name} ${userInfo.last_name}`}>
									<NavDropdown.Item as={Link} to="/profile">
										<i className="fas fa-user me-1"></i> <span>Profile</span>
									</NavDropdown.Item>
									<NavDropdown.Item
										as={Link}
										to="/logout"
										onClick={() => dispatch(logout())}
									>
										<i className="fas fa-sign-out-alt me-2"></i>
										<span>Logout</span>
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<>
									<Nav.Link as={Link} to="/login">
										<i className="fas fa-user me-1"></i>Sign-In
									</Nav.Link>
								</>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title="Admin">
									<NavDropdown.Item as={Link} to="/admin/users">
										Users
									</NavDropdown.Item>{" "}
									<NavDropdown.Item as={Link} to="/admin/products">
										Products
									</NavDropdown.Item>{" "}
									<NavDropdown.Item as={Link} to="/admin/orders">
										Orders
									</NavDropdown.Item>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
