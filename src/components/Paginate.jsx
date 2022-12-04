import React from "react";
import { Pagination } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

const Paginate = ({ total, page }) => {
	const location = useLocation();
	const path = location.pathname;
	if (total <= 1) return null;

	return (
		<Pagination className="justify-content-center my-3">
			{[...Array(Math.ceil(total)).keys()].map((p) => (
				<Pagination.Item key={p} active={p + 1 === Number(page)} as="span">
					<Link to={`${path}?/page=${p + 1}`}>{p + 1}</Link>
				</Pagination.Item>
			))}
		</Pagination>
	);
};

export default Paginate;
