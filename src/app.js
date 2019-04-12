import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'materialize-css/dist/css/materialize.min.css'
import './style.scss'

import Home from './components/Home'
import AllBeefs from './components/AllBeefs'
import Sidenav from './components/Sidenav'
import Navbar from './components/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <main>
          <Sidenav />
          <Navbar />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/beefs" component={AllBeefs} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
