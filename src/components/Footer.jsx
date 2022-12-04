import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row className="text-center py-3">
					<Col>Copyright &copy; Dani Matuko</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
