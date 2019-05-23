import React, { useEffect, useState } from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Image,
  Dropdown
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Repositories from './Repositories';
import RepoChat from './RepoChat';

function ChatPage(props) {
  const [authenticated, setAuthentication] = useState(false);
  const [userData, setUserData] = useState({});
  const [clickedItem, setClickedItem] = useState({});

  useEffect(() => {
    if (authenticated === false) {
      axios
        .get('http://localhost:5000/checkauth')
        .then(res => {
          setUserData(res.data.githubPersonData);
          res.data.response === 'user is not authenticated'
            ? props.history.push('/signin')
            : setAuthentication(true);
        })
        .catch(err => {
          props.history.push('/signin');
        });
    }
  });

  async function handleSignOut(e) {
    e.preventDefault();
    await axios.get('http://localhost:5000/logout').then(res => {
      if (res.data.response === 'success') {
        props.history.push('/');
      }
    });
  }

  function passItemToChat(item) {
    setClickedItem(item);
  }

  return (
    authenticated && (
      <div className="color-bg">
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
                {userData && (
                  <Container>
                    <Row>
                      <Col xs={0.3} md={0.2}>
                        <Image
                          src={userData.photos[0].value}
                          roundedCircle
                          className="profileImg"
                        />
                        <span className="profile-name">
                          {userData.username}
                        </span>
                      </Col>
                    </Row>
                  </Container>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Jumbotron>
        <div className="repo-parent-flex">
          <div className="repo-left-div">
            {userData && (
              <Repositories
                userRepoData={userData._json.repos_url}
                sendClickedItem={item => passItemToChat(item)}
              />
            )}
          </div>
          <div className="repo-right-div">
            {userData && <RepoChat selectedRepo={clickedItem} />}
          </div>
        </div>
      </div>
    )
  );
}

export default withRouter(ChatPage);
