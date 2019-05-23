import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Jumbotron } from 'react-bootstrap';

function SignUp(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authResponse, setAuthResponse] = useState('');

  function handleLoginData(e) {
    e.preventDefault();
    axios
      .post('http://localhost:5000/signup', { username, password })
      .then(res => {
        handleResponse();
      })
      .catch(err => console.log('err', err));
  }

  async function handleResponse() {
    await axios
      .get('http://localhost:5000/authenticate')

      .then(res => {
        setAuthResponse('User already available');
        res.data.response === 'Not Authenticated'
          ? props.history.push('/signup')
          : props.history.push('/chatpage');
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Jumbotron className="center jumbo-margin">
        <h1>Sign Up Page</h1>
      </Jumbotron>
      <Jumbotron className="login-container">
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              {authResponse}
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
                  Sign Up
                </Button>
              </Form>
            </Col>
            <Col className="sign-in-col">
              <a href="http://localhost:5000/auth/github">
                <Button variant="outline-dark" className="position-btn">
                  <i className="fab fa-github" />
                  Sign up with Github
                </Button>
              </a>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </>
  );
}

export default withRouter(SignUp);
