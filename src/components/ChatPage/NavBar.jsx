import React from 'react';
import {
  Jumbotron,
  Dropdown,
  Container,
  Row,
  Col,
  Image
} from 'react-bootstrap';

function NavBar(props) {
  return (
    <Jumbotron className="center jumbo-margin-chat">
      <div className="left-side-div">
        <h1 className="chat-heading">Chat Box</h1>
      </div>
      <div className="right-side-div">
        <Dropdown>
          <Dropdown.Toggle
            className="color-btn btn-size"
            variant="secondary"
            id="dropdown-basic"
          >
            {props.name && (
              <Container>
                <Row>
                  <Col xs={0.3} md={0.2}>
                    <Image
                      src={props.photo}
                      roundedCircle
                      className="profileImg"
                    />
                    <span className="profile-name">{props.name}</span>
                  </Col>
                </Row>
              </Container>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={props.handleSignOut}>
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Jumbotron>
  );
}

export default NavBar;
