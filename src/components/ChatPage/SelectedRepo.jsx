import React, { useState } from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import ChatDoneHere from './ChatDoneHere';

function SelectedRepo(props) {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
  }

  return (
    <>
      <ButtonToolbar>
        {/* Header */}
        <Button variant="outline-dark btn-style" className="child-design">
          <div className="repo-child-parent" onClick={handleShow}>
            <div className="child-left-div">
              <h3>{props.selectedRepo.name}</h3>
            </div>
            <div className="child-right-div">
              <p className="contributor-head">:Contributors:</p>
              {props.contributors.map(item => (
                <span key={item.id}>{item.login},</span>
              ))}
            </div>
          </div>
        </Button>
      </ButtonToolbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.selectedRepo.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>:Contributors:</h6>
          {props.contributors.map(item => (
            <span key={item.id}>{item.login}, </span>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Main chat component */}
      <ChatDoneHere />
    </>
  );
}

export default SelectedRepo;
