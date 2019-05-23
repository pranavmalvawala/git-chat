import React from 'react';

function RepoUnit(props) {
  const { itemToBeHighlighted } = props;

  return (
    <div>
      {itemToBeHighlighted ? (
        <div
          className="repo-unit style"
          onClick={() => props.clickedItem(props.repoData)}
        >
          <h5 className="repo-name">{props.repoData.name}</h5>
          <p className="repo-description">{props.repoData.description}</p>
        </div>
      ) : (
        <div
          className="repo-unit"
          onClick={() => props.clickedItem(props.repoData)}
        >
          <h5 className="repo-name">{props.repoData.name}</h5>
          <p className="repo-description">{props.repoData.description}</p>
        </div>
      )}
    </div>
  );
}

export default RepoUnit;
