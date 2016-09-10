import React from "react";
import { Button, Collapse, Well } from "react-bootstrap";
import AddTransactionView from "./AddTransactionView";

const ADD_TRANSACTION_BUTTON_TEXT = "Add";
const HIDE_BUTTON_TEXT = "Hide";

const AddTransactionCollapsable = React.createClass({
    getInitialState() {
        return {
            open: false,
            buttonText: ADD_TRANSACTION_BUTTON_TEXT
        }
    },

    render() {
        return (
            <div>
                <Button onClick={ () => this.setState({
                    open: !this.state.open,
                    buttonText: this.state.open
                        ? ADD_TRANSACTION_BUTTON_TEXT
                        : HIDE_BUTTON_TEXT
                })}>
                    {this.state.buttonText}
                </Button>
                <Collapse in={this.state.open}>
                    <div>
                        <AddTransactionView/>
                    </div>
                </Collapse>
            </div>
        );
    }
});
export default AddTransactionCollapsable;