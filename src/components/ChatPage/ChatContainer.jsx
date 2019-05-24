import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import SelectedRepo from './SelectedRepo';

function ChatContainer(props) {
  const [contributors, setContributors] = useState([]);

  // executed only when the props values are changed
  useEffect(() => {
    // returns name of contributors of selected repo
    axios
      .get(props.selectedRepo.contributors_url)
      .then(res => {
        setContributors(res.data);
      })
      .catch(err => console.log(err));
  }, [props.selectedRepo.name, props.selectedRepo.contributors_url]);

  return (
    <div className="repo-chat-div">
      <Jumbotron className="repo-chat-div padding-chat">
        {props.selectedRepo.name === undefined ? (
          // when no repo is selected this text is displayed
          <div>
            <h1>Hello!</h1>
            <p>
              Start chatting here with contributors of particular repository by
              selecting the one you desire
            </p>
          </div>
        ) : (
          // if a repo is selected this component is rendered
          contributors &&
          contributors.length > 0 && (
            <div>
              <SelectedRepo
                selectedRepo={props.selectedRepo}
                contributors={contributors}
              />
            </div>
          )
        )}
      </Jumbotron>
    </div>
  );
}

export default ChatContainer;
