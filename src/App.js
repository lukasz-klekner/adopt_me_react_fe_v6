import { useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import './App.css'
import ThemeContext from './ThemeContext'

const Details = lazy(() => import('./Details'))
const SearchParams = lazy(() => import('./SearchParams'))

const App = () => {
  const theme = useState('darkblue')

  return (
    <ThemeContext.Provider value={theme}>
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
    </ThemeContext.Provider>
  )
}

export default App
