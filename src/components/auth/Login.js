import React from 'react'
import axios from 'axios'

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
    console.log('I am running')
    console.log(this.state.data)
    e.preventDefault()
    axios
      .post('/api/login', this.state.data)
      .then((res) => {
        console.log(res)
        Auth.setToken(res.data.token)
        this.props.history.push('/beefs')
      })
  }

  handleChange({ target: { id, value }}) {
    const data = {...this.state.data, [id]: value }
    this.setState({ data })
  }


  render() {
    return(
      <div className="container login">
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.email}
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
                  value={this.state.password}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button className="button">Log In</button>
          </form>
        </div>
      </div>


    )
  }
}

export default Login
