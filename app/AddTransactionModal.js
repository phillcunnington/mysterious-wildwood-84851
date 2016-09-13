import React from "react";
import { Button, Modal } from "react-bootstrap";
import AddTransactionView from "./AddTransactionView";

const AddTransactionModal = React.createClass({
    getInitialState() {
        return { showModal: false };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    render() {
        return (
            <div>
                <Button onClick={this.open}>
                    Add Transaction
                </Button>

                <Modal animation={false} show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddTransactionView/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});
export default AddTransactionModal;