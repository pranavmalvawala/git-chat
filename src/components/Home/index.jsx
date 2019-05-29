import React from 'react';
import { Jumbotron, Container, Button, ButtonToolbar } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function Home(props) {
  function handleSignUp() {
    props.history.push('/signup');
  }

  function handleSignIn() {
    props.history.push('/signin');
  }
  return (
    <div className="color-bg">
      <Jumbotron fluid>
        <Container className="center">
          <h1>Welcome to git-chat</h1>
          <p>
            Kindly press Sign In if you already got an account or create one
            using a Sign Up button
          </p>
        </Container>
      </Jumbotron>
      <Container className="center div-color">
        <ButtonToolbar className="center distance">
          <a href="http://localhost:5000/auth/github">
            <Button variant="outline-dark" className="center margin">
              <i className="fab fa-github" />
              Sign in with Github
            </Button>
          </a>
        </ButtonToolbar>
      </Container>
    </div>
  );
}

export default withRouter(Home);
