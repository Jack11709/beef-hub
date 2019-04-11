import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    console.log('I am submitting')
    e.preventDefault()
    axios
      .post('/api/register', this.state.data)
      .then((res) => {
        Auth.setToken(res.data.token)
        this.props.history.push('/login')
      })
  }

  handleChange({ target: { id, value }}) {
    const data = {...this.state.data, [id]: value }
    this.setState({ data })
  }


  render() {
    return(
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
                  value={this.state.data.username}
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
                  value={this.state.data.email}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password"
                  type="password"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.data.password}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password_confirmation"
                  type="password"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.data.password_confirmation}
                />
                <label htmlFor="password_confirmation">Confirm Password</label>
              </div>
            </div>
            <button className="button center">Register</button>
          </form>
        </div>
      </div>


    )
  }
}

export default Register
