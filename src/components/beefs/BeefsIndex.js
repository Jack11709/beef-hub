import React from 'react'

import axios from 'axios'

class AllBeefs extends React.Component{
  state = { beefs: [] }

  componentDidMount() {
    axios.get('/api/beefs')
      .then(res => this.setState({ beefs: res.data }))
  }

  render() {
    const { beefs } = this.state
    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col s12 m12 l12">
              {beefs.map(beef => (
                <div key={beef.id} className="card white">
                  <div className="card-content black-text">
                    <span className="card-title">
                    Beefee:
                      {beef.beefee.username}
                    </span>
                    <p>{beef.reason}</p>
                  </div>
                  <div className="card-action">
                    <a href="#">
                    Beefer:
                      {beef.beefer.username}
                    </a>
                    <a id="respond" href="#">
                    Respond
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default AllBeefs
