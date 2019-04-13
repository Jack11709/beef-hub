import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Collapsible, CollapsibleItem, Row, Col } from 'react-materialize'

import Auth from '../../lib/Auth'


class ProfilePage extends React.Component {
  async componentDidMount() {
    M.AutoInit()
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
        <div className="container">
          <Row>
            <Col s={6}>
              <img src={user.profile_image} width="250" alt="cow" />
            </Col>
            <Col s={6}>
              <h2 className="username-header">
                {user.username}
                &apos;s profile
              </h2>
              <div className="profile-flames">
                {user.likes.map(() => <img src="../../assets/flame.png" width="25" alt="flame" />)}
              </div>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>
            <Col s={6}>
              <div className="beefs-following">
                <h2 className="profile-following-header">You follow these beefs:</h2>
                <Collapsible>
                  {user.beefs_followed.map(beef => (
                    <CollapsibleItem key={beef.id} header="Beef">{beef.reason}</CollapsibleItem>
                  ))}
                </Collapsible>
              </div>
            </Col>
            <Col s={6}>
              <div className="beefs-against">
                <h2 className="profile-against-header">You raised these beefs:</h2>
                <Collapsible>
                  {user.beefs_against.map(beef => (
                    <CollapsibleItem key={beef.id} header="Beef">{beef.reason}</CollapsibleItem>
                  ))}
                </Collapsible>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default ProfilePage
