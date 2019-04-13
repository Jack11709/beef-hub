import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class BeefsIndex extends React.Component{
  state = { beefs: [] }


  async componentDidMount() {
    const res = await axios.get('/api/beefs')
    this.setState({beefs: res.data})
  }

  render() {
    console.log(this.state)
    const { beefs } = this.state
    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col s12 m12 l12">
              {beefs.map(beef => (
                <Link to={`/beefs/${beef.id}`}>
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default BeefsIndex
