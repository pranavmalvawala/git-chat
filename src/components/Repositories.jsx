import React, { useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import RepoUnit from './RepoUnit';

function Repositories(props) {
  const [repoData, setRepoData] = useState([]);
  const [highLightItem, setHighlightItem] = useState({});

  useEffect(() => {
    if (repoData.length <= 0) {
      axios
        .get(props.userRepoData)
        .then(res => {
          setRepoData(res.data);
        })
        .catch(err => console.log(err));
    } else {
    }
  });

  function theClickedItem(item) {
    setHighlightItem(item);
  }

  return (
    <div>
      <Jumbotron className="repo-padding">
        <h3 className="repo-heading">Your Repositories</h3>
        <div>
          {repoData ? (
            repoData.map(item =>
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
