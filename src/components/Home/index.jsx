import React, { Component } from 'react';
import { Jumbotron, Container, Button, ButtonToolbar } from 'react-bootstrap';
import ChatPage from '../ChatPage';

class Home extends Component {
  constructor(props) {
    super(props);

    // user data is stored in user, disabled is for closing popup window
    this.state = {
      user: {},
      disabled: ''
    };
  }

  // connecting to server through socket after component mounts
  componentDidMount() {
    const { socket, provider } = this.props;

    socket.on(provider, user => {
      this.popup.close();
      this.setState({ user });
    });
  }

  // checks the status of pop window
  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;

      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);

        this.setState({ disabled: '' });
      }
    }, 1000);
  }

  // opens popup with mentioned url
  openPopup() {
    const { provider, socket } = this.props;

    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `http://localhost:5000/${provider}?socketId=${socket.id}`;

    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: 'disabled' });
    }
  };

  // for sign out
  signOut = () => {
    this.setState({
      user: {}
    });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="color-bg">
        {user.name ? (
          <ChatPage
            name={user.name}
            photo={user.photo}
            repos={user.repos}
            handleSignOut={() => this.signOut()}
            socket={this.props.socket}
          />
        ) : (
          <div>
            <Jumbotron fluid>
              <Container className="center">
                <h1>Welcome to git-chat</h1>
                <p>
                  Kindly press Sign In if you already got an account or create
                  one using a Sign Up button
                </p>
              </Container>
            </Jumbotron>
            <Container className="center div-color">
              <ButtonToolbar className="center distance">
                <Button
                  size="lg"
                  variant="outline-dark"
                  className="center margin github-btn"
                  onClick={this.startAuth}
                >
                  <i className="fab fa-github " />
                  Sign in with Github
                </Button>
              </ButtonToolbar>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
