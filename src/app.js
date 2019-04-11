import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'materialize-css/dist/css/materialize.min.css'
import './style.scss'

import Home from './components/Home.js'
import AllBeefs from './components/AllBeefs.js'
import Navbar from './components/Navbar.js'
import Register from './components/auth/Register.js'
import Login from './components/auth/Login.js'

class App extends React.Component{
  constructor() {
    super()
  }


  render() {
    return(
      <BrowserRouter>
        <main>
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
