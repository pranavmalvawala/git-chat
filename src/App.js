import React from "react";
import io from "socket.io-client";
import "./App.css";
import "./components/components.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/index";
const socket = io("http://localhost:5000");
const provider = "github";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home socket={socket} provider={provider} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
