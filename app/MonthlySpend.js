import React, { PropTypes } from "react";
import { Well } from "react-bootstrap";
import numeral from "./configureNumeral";

const MonthlySpend = ({ monthlySpend }) => (
    <Well style={{display: "inline-block"}}>
        Spent this month: {numeral(monthlySpend / 100).format()}
    </Well>
);
MonthlySpend.propTypes = {
    monthlySpend: PropTypes.number.isRequired
};
export default MonthlySpend;