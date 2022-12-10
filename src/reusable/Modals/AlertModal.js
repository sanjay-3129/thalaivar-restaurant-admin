import React from "react";
// import { propTypes } from "react-bootstrap/esm/Image";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmModal = (props) => {
  return (
    <Modal show={props.showModal} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
