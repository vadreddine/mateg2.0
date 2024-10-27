// src/components/UI/Modal.jsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, title, children, onConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>
            Confirmer
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
