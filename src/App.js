import React from 'react';
import './App.css';
import './components/components.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp/index';
import ChatPage from './components/ChatPage/index';
import SignIn from './components/SignIn/index';
import Home from './components/Home/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/chatpage" component={ChatPage} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
