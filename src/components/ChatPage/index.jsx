import React, { useState } from 'react';
import axios from 'axios';
import Repositories from '../Repositories';
// component which is parent to all the unit repositories displayed on left
import ChatContainer from './ChatContainer';
// component on the right which contains chat functionality
import NavBar from './NavBar';

// import io from 'socket.io-client';

function ChatPage(props) {
  const [clickedItem, setClickedItem] = useState({});

  // redirects to home page after the response of server is OK on SIGN OUT rqst
  function handleSignOut(e) {
    e.preventDefault();
    axios.get('http://localhost:5000/logout').then(res => {
      if (res.data.response === 'success') {
        props.handleSignOut();
      }
    });
  }

  // saves the clicked item in state which is later passed to RepoChat component
  function passItemToChat(item) {
    setClickedItem(item);
    // connection is made just once on the clicked repo
    // const socket = io('http://localhost:5000');
  }

  return (
    <div className="color-bg">
      <NavBar
        name={props.name}
        photo={props.photo}
        handleSignOut={handleSignOut}
      />
      <div className="repo-parent-flex">
        <div className="repo-left-div">
          {props.repos && (
            <Repositories
              userRepoData={props.repos}
              sendClickedItem={item => passItemToChat(item)}
            />
          )}
        </div>
        <div className="repo-right-div">
          {props.repos && (
            <ChatContainer
              selectedRepo={clickedItem}
              socket={props.socket}
              name={props.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
