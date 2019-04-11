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
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="Placeholder" id="first_name" type="text" className="validate"/>
              <label htmlFor="first_name">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate"/>
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" className="validate"/>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password-confirmation" type="password" className="validate"/>
              <label htmlFor="password">Confirm Password</label>
            </div>
          </div>
        </form>
      </div>


    )
  }
}

export default Login
