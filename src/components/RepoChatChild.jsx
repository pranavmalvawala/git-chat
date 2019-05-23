import React, { useState } from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import ChatPanel from './ChatPanel';

function RepoChatChild(props) {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
  }

  const { selectedRepo, contributors } = props;
  return (
    <>
      <ButtonToolbar>
        <Button variant="outline-dark" className="child-design">
          <div className="repo-child-parent" onClick={handleShow}>
            <div className="child-left-div">
              <h3>{selectedRepo.name}</h3>
            </div>
            <div className="child-right-div">
              <p className="contributor-head">:Contributors:</p>
              {contributors.map(item => (
                <span key={item.id}>{item.login},</span>
              ))}
            </div>
          </div>
        </Button>
      </ButtonToolbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRepo.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>:Contributors:</h6>
          {contributors.map(item => (
            <span key={item.id}>{item.login}, </span>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ChatPanel />
    </>
  );
}

export default RepoChatChild;
