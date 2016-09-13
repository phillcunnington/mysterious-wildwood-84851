import React  from "react";
import { connect } from "react-redux";
import { addTransaction } from "./actions";
import { Button, Form, FormGroup, Col, ControlLabel, InputGroup, FormControl } from "react-bootstrap";
import moment from "moment";
import numeral from "./configureNumeral";

const AddTransactionForm = React.createClass({
    getInitialState() {
        return {
            date: moment().startOf("day"),
            payee: "",
            amount: 0
        };
    },

    handleSubmit(e) {
        e.preventDefault();
        const data = Object.assign({}, this.state, {date: this.state.date.format()});
        this.props.dispatch(addTransaction(data));
        this.setState(this.getInitialState());
    },

    clearForm() {
        this.setState(this.getInitialState());
    },

    handleDateChange(e) {
        this.setState({date: moment(e.target.value, "DD/MM/YYYY")});
    },

    handlePayeeChange(e) {
        this.setState({payee: e.target.value});
    },

    handleAmountChange(e) {
        this.setState({amount: e.target.value * 100});
    },

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Date
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text"
                                         placeholder="dd/mm/yyyy"
                                         defaultValue={this.state.date.format("DD/MM/YYYY")}
                                         onBlur={this.handleDateChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Payee
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text"
                                         placeholder="Payee"
                                         value={this.state.payee}
                                         onChange={this.handlePayeeChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Amount
                        </Col>
                        <Col sm={10}>
                            <InputGroup>
                                <InputGroup.Addon>£</InputGroup.Addon>
                                <FormControl type="number"
                                             placeholder="0.00"
                                             value={numeral(this.state.amount / 100).format("0[.]0[0]")}
                                             onChange={this.handleAmountChange} pattern="(d{3})([.])(d{2})"/>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={10} sm={2}>
                            <Button onClick={this.handleSubmit}>Add</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
});
export default connect()(AddTransactionForm);