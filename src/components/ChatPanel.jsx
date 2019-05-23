import React from 'react';
import io from 'socket.io-client';

function ChatPanel() {
  const socket = io('http://localhost:5000');
  return (
    <div>
      <h2>It works</h2>
    </div>
  );
}

export default ChatPanel;
