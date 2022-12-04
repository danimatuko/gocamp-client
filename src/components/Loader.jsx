import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
	return <Spinner animation="border" style={style} />;
};

const style = {
	display: "block",
	margin: "30vh auto"
};

export default Loader;
