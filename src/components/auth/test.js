import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        email: '',
        password: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/login', this.state.data)
      .then((res) => {
        Auth.setToken(res.data.token)
        this.props.history.push('/login')
      })
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    this.setState({ data })
  }


  render() {
    return(
      <div className="container">
        <div className="columns">
          <div className="column">
            <form onSubmit={this.handleSubmit}>
              <h2 className="title form">Login</h2>
              <div className="field">
                <label className="label">Email</label>
                <input
                  className="input"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Password</label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <button className="button">Log in</button>
              <Link to={{pathname: '/register'}}><button className="button">Register</button></Link>
            </form>
          </div>
        </div>
      </div>


    )
  }
}

export default Login
