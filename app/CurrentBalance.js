import React, { PropTypes } from "react";
import { Well } from "react-bootstrap";
import numeral from "./configureNumeral";

const CurrentBalance = ({ currentBalance }) => (
    <Well style={{display: "inline-block", margin: "5px"}}>
        Current Balance: {numeral(currentBalance / 100).format()}
    </Well>
);
CurrentBalance.propTypes = {
    currentBalance: PropTypes.number.isRequired
};

export default CurrentBalance;