import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import axios from 'axios'
import 'materialize-css/dist/css/materialize.min.css'
import './style.scss'

import AllBeefs from './components/AllBeefs.js'

class App extends React.Component{
  constructor() {
    super()

    this.state = { beefs: []}
  }

  componentDidMount() {
    axios.get('/api/beefs')
      .then(res => this.setState({ beefs: res.data }))
  }

  render() {
    return(
      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/" component={AllBeefs} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
