import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import './App.css'

const Details = lazy(() => import('./Details'))
const SearchParams = lazy(() => import('./SearchParams'))

const App = () => (
  <Provider store={store}>
    <div>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  </Provider>
)

export default App
