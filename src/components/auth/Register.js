import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'

class Register extends React.Component {
    state = {
      data: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }


  handleSubmit = (e) => {
    e.preventDefault()
    const { data } = this.state
    const { history } = this.props
    axios
      .post('/api/register', data)
      .then((res) => {
        Auth.setToken(res.data.token)
        history.push('/login')
      })
  }

  handleChange = ({ target: { id, value }}) => {
    this.setState(prevState => ({ data: {...prevState.data, [id]: value } }))
  }

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation
    } = this.state
    return (
      <div className="container register">
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="username"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  value={username}
                />
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  onChange={this.handleChange}
                  value={email}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  onChange={this.handleChange}
                  value={password}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password_confirmation"
                  type="password"
                  className="validate"
                  onChange={this.handleChange}
                  value={passwordConfirmation}
                />
                <label htmlFor="password_confirmation">Confirm Password</label>
              </div>
            </div>
            <button type="submit" className="button">Register</button>
          </form>
        </div>
      </div>


    )
  }
}

export default Register
