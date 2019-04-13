import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

import Auth from '../../lib/Auth'


class ProfilePage extends React.Component {
  async componentDidMount() {
    const elem = document.querySelector('.collapsible')
    M.Collapsible.init(elem)
    const res = await axios.get('/api/users/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
    this.setState({ user: res.data })
  }

  render() {
    console.log(this.state)
    if (!this.state) return null
    const { user } = this.state
    return (
      <div>
        <h2>
          User:
          {user.username}
        </h2>
        <div className="beefs-following">
          <h2>You are currently following these beefs:</h2>
          <ul className="collapsible">
            {user.beefs_followed.map(beef => (
              <li key={beef.id}>
                <div className="collapsible-header">Beef</div>
                <div className="collapsible-body">
                  <span>{beef.reason}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default ProfilePage
