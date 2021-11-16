import React from 'react';
import logo from './logo.svg';
import './App.css';
import {HashRouter as Router,
  Switch,
  
  Route,
  Link} from 'react-router-dom';
  // import { browserHistory } from 'react-router'
import ImageGrid from './components/grid.component';
import EditGrid from './components/edit-grid.component';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={ImageGrid} />
          <Route path="/edit" exact component={EditGrid} />
          <Route path='*' component={ImageGrid} />
        </Switch>
      </Router>
  );
}

export default App;
