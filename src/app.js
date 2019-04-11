import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

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
      <div>
        {this.state.beefs.map(beef =>
          <div key ={beef.id}>
            <h2>Beefee: {beef.beefee.username}</h2>
            <h2>Beef: {beef.reason}</h2>
            <h2>Beefer: {beef.beefer.username}</h2>
          </div>

        )}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
