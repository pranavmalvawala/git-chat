import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function ChatDoneHere(props) {
  const [msg, setMsg] = useState('');
  const [outputWindow, setOutputWindow] = useState([]);
  const [display, setDisplay] = useState(false);

  function sendChatMsg() {
    // const socket = io('http://localhost:5000');
    props.socket.emit('chat', {
      message: msg,
      handle: props.name
    });
    const itemsD = props.socket.on('chat', function(data) {
      console.log('sent', data);
      return <p>{data.message}</p>;
      // setOutputWindow(outputWindow.push(data));
    });

    return itemsD;
  }

  function newData() {
    const item = props.socket.on('chat', function(data) {
      console.log(data);
      return <span>{data.message}</span>;
    });
    console.log('asd', item);
    return;
  }

  useEffect(() => {
    console.log('here');
    setDisplay(true);
    newData();
    // props.socket.on('chat', function(data) {
    //   console.log('sent', data);
    // });
    // setMsg('');
  }, [outputWindow]);

  return (
    <div>
      {display && console.log('rendered', sendChatMsg())}
      <div className="chat-window">
        {/* {display && item} */}
        {/* {outputWindow &&
          outputWindow.length &&
          outputWindow.map((each, index) => (
            <div key={index}>
              <span>{each.handle} : </span>
              <span>{each.message}</span>
            </div>
          ))} */}
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
