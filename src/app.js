import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'materialize-css/dist/css/materialize.min.css'
import './style.scss'

import Home from './components/Home'
import BeefShow from './components/beefs/BeefShow'
import BeefsIndex from './components/beefs/BeefsIndex'
import ProfilePage from './components/user/ProfilePage'
import SecureRoute from './lib/SecureRoute'
import Navbar from './components/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <Switch>
          <Route path="/beefs/:id" component={BeefShow} />
          <SecureRoute path="/user/profile" component={ProfilePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/beefs" component={BeefsIndex} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
