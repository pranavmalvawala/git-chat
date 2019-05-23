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
          <Button
            size="lg"
            variant="outline-info"
            className="center margin"
            onClick={handleSignUp}
          >
            Sign up
          </Button>
          <Button
            size="lg"
            variant="outline-info"
            className="center margin"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </ButtonToolbar>
      </Container>
    </div>
  );
}

export default withRouter(Home);
