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
        {this.state.beefs.map(beef => <h2 key={beef.id}>{beef.reason}</h2>)}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
