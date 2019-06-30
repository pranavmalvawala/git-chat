import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import io from 'socket.io-client';

function ChatDoneHere(props) {
  const [msg, setMsg] = useState('');
  const [outputWindow, setOutputWindow] = useState([]);

  function sendChatMsg() {
    // const socket = io('http://localhost:5000');
    // props.socket.emit('chat', {
    //   message: msg,
    //   handle: props.name
    // });
    // props.socket.on('chat', function(data) {
    //   console.log('sent', data);
    //   setOutputWindow([...outputWindow, data]);
    // });
    // const socket = io('http://localhost:5000/my-chat');
    // console.log('herer', socket);
  }

  useEffect(() => {
    console.log('..');
    const socket = io('http://localhost:5000/my-chat');
  });

  return (
    <div>
      <div className="chat-window">
        {outputWindow &&
          outputWindow.length &&
          outputWindow.map((each, index) => (
            <div key={index}>
              <span>{each.handle} : </span>
              <span>{each.message}</span>
            </div>
          ))}
      </div>
      <InputGroup className="mb-3 input-style">
        <FormControl
          placeholder="Type msg here..."
          value={msg}
          onChange={e => setMsg(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            className="btn-width"
            onClick={sendChatMsg}
          >
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

export default ChatDoneHere;
