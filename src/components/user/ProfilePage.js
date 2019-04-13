import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'


class ProfilePage extends React.Component {



  async componentDidMount() {
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
          {user.beefs_followed.map(beef => <div key={beef.id}><h2>{beef.reason}</h2></div>)}
        </div>
      </div>
    )
  }
}
export default ProfilePage
