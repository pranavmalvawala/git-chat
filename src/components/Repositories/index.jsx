import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import RepoUnit from './RepoUnit';

function Repositories(props) {
  const [repoData, setRepoData] = useState([]);
  const [highLightItem, setHighlightItem] = useState({});

  // called only once after return (as a componentDidMount)
  useEffect(() => {
    if (repoData.length <= 0) {
      // gets all the data of ones repositories
      axios
        .get(props.userRepoData)
        .then(res => {
          setRepoData(res.data);
        })
        .catch(err => console.log(err));
    } else {
    }
  }, [props.userRepoData, repoData.length]);

  // sets the clicked item in state which will be highlighted
  function theClickedItem(item) {
    setHighlightItem(item);
  }

  // renders all repositories
  // better approach appreciated
  return (
    <div>
      <Jumbotron className="repo-padding">
        <h3 className="repo-heading">Your Repositories</h3>
        <div>
          {repoData ? (
            repoData.map(item =>
              // the Highlighted repository will be displayed by this part
              item.id === highLightItem.id ? (
                <RepoUnit
                  repoData={item}
                  key={item.id}
                  clickedItem={item => {
                    props.sendClickedItem(item);
                    theClickedItem(item);
                  }}
                  itemToBeHighlighted={highLightItem.id}
                />
              ) : (
                // Rest of the repositories will be displayed by this
                <RepoUnit
                  repoData={item}
                  key={item.id}
                  clickedItem={item => {
                    props.sendClickedItem(item);
                    theClickedItem(item);
                  }}
                />
              )
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Jumbotron>
    </div>
  );
}

export default Repositories;
