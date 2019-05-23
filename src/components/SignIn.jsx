import React, { useState } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function SignIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authResponse, setAuthResponse] = useState('');

  function handleLoginData(e) {
    e.preventDefault();
    axios
      .post('http://localhost:5000/login', { username, password })
      .then(res => {
        console.log(res.data.response);
        props.history.push('/chatpage');
      })
      .catch(err => {
        setAuthResponse('No User available');
        props.history.push('/signin');
      });
  }

  return (
    <>
      <Jumbotron className="center jumbo-margin">
        <h1>Sign In Page</h1>
      </Jumbotron>
      <Jumbotron className="login-container">
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={handleLoginData}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>GitHub's Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    placeholder="Enter username/email    "
                    onChange={e => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col className="sign-in-col">
              <a href="http://localhost:5000/auth/github">
                <Button variant="outline-dark" className="position-btn">
                  <i className="fab fa-github" />
                  Sign in with Github
                </Button>
              </a>
            </Col>
          </Row>
          {authResponse}
        </Container>
      </Jumbotron>
    </>
  );
}

export default withRouter(SignIn);
