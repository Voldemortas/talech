import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import RouteNoMatch from '../src/pages/RouteNoMatch'
import RouteList from '../src/pages/RouteList'
import RouteEdit from '../src/pages/RouteEdit'
import RouteCreate from '../src/pages/RouteCreate'
import RouteDetails from '../src/pages/RouteDetails'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/products/create'>
          <RouteCreate />
        </Route>
        <Route exact path='/products/:id/edit'>
          <RouteEdit />
        </Route>
        <Route exact path='/products/:id'>
          <RouteDetails />
        </Route>
        <Route exact path='/products'>
          <RouteList />
        </Route>
        <Route exact path='/'>
          <Redirect to='/products' />
        </Route>
        <Route>
          <RouteNoMatch />
        </Route>
      </Switch>
    </Router>
  )
}
