import React from 'react'
// import { Route, Routes, IndexRoute } from 'react-router'

import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

/* containers */
// import PageNotFound from './containers/system/PageNotFound'
import FacebookLogin from './containers/system/FacebookLogin'
import WordsSuggest from './containers/words/WordsSuggest'

const Home = () => (
  <div>Home</div>
)


export default () => (
  <HashRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/words">Words</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route exact path="/words" component={WordsSuggest} />
      <Route exact path="/login" component={FacebookLogin} />
    </div>
  </HashRouter>
)
