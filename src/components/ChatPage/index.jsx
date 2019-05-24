import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Repositories from '../Repositories';
// component which is parent to all the single unit repositories displayed on left
import ChatContainer from './ChatContainer';
import NavBar from './NavBar';
// component on the right which contains chat functionality
import io from 'socket.io-client';

function ChatPage(props) {
  const [authenticated, setAuthentication] = useState(false);
  const [userData, setUserData] = useState({});
  const [clickedItem, setClickedItem] = useState({});

  // checks user's authentication
  useEffect(() => {
    //  this part accomplish 2 things
    // 1 - if the user tries to access the page directly user is redirected to SIGN IN,
    // 2 - once the user signed in and wants to access page directly he wont have to
    // sign in until one decides to log out.
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
    // this [] at end makes the useEffect to call only if there are changes in
    // the mentioned item in those array.
  }, [authenticated, props.history]);

  // redirects to home page after the response of server is OK on SIGN OUT rqst
  async function handleSignOut(e) {
    e.preventDefault();
    setAuthentication(false);
    await axios.get('http://localhost:5000/logout').then(res => {
      if (res.data.response === 'success') {
        props.history.push('/');
      }
    });
  }

  // saves the clicked item in state which is later passed to RepoChat component
  function passItemToChat(item) {
    setClickedItem(item);
    // connection is made just once on the clicked repo
    const socket = io('http://localhost:5000');
  }

  return (
    authenticated && (
      <div className="color-bg">
        <NavBar userData={userData} handleSignOut={handleSignOut} />
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
            {userData && <ChatContainer selectedRepo={clickedItem} />}
          </div>
        </div>
      </div>
    )
  );
}

export default withRouter(ChatPage);
