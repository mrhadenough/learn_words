import React from 'react'
// import { Route, Routes, IndexRoute } from 'react-router'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

/* containers */
import PageNotFound from './containers/system/PageNotFound'

const Home = () => (
  <div>Home</div>
)

export default (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="*" component={PageNotFound}/>
    </div>
  </Router>
)
