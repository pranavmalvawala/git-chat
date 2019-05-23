import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import RepoChatChild from './RepoChatChild';

function RepoChat(props) {
  const [contributors, setContributors] = useState([]);
  const [oldProps, setOldProps] = useState('');
  const [render, setRender] = useState(0);

  useEffect(() => {
    setOldProps(props.selectedRepo.name);

    if (props.selectedRepo.name !== oldProps) {
      axios
        .get(props.selectedRepo.contributors_url)
        .then(res => {
          setContributors(res.data);
        })
        .catch(err => console.log(err));
    }
  });

  return (
    <div className="repo-chat-div">
      {console.log('render', render)}
      <Jumbotron className="repo-chat-div padding-chat">
        {props.selectedRepo.name === undefined ? (
          <div>
            <h1>Hello!</h1>
            <p>
              Start chatting here with contributors of particular repository by
              selecting the one you desire
            </p>
          </div>
        ) : (
          <RepoChatChild
            selectedRepo={props.selectedRepo}
            contributors={contributors}
          />
        )}
      </Jumbotron>
    </div>
  );
}

export default RepoChat;
