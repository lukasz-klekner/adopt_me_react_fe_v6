import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './App.css'
import Details from './Details';

import SearchParams from "./SearchParams";

const App = () => (
  <div>
    <Router>
    <header>
      <Link to='/'>
          <h1>Adopt me!</h1>
      </Link>
      </header>
      <Switch>
        <Route path='/details/:id'>
          <Details />
        </Route>
        <Route path='/'>
          <SearchParams />
        </Route>
      </Switch>
    </Router>

  </div>
);

export default App
