import React from 'react';
import './App.css';
import './components/components.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChatPage from './components/ChatPage/index';
import Home from './components/Home/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/chatpage" component={ChatPage} />
      </Switch>
    </Router>
  );
}

export default App;
