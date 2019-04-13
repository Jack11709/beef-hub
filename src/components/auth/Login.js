import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

class Login extends React.Component {
  // So we dont need constructors, just define your state as per below
  state = {
    data: {
      email: '',
      password: '',
    }
  }

  // we are going to use anon arrow function now, these will bind directly to the class, so no need to do that anymore
  handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = this.state
    const { history } = this.props
    try {
      const post = await axios.post('/api/login', data)
      const token = await post.data.token
      Auth.setToken(token)
      history.push('/beefs')
    } catch (err) {
      console.log(err)
    }
  }

  // im always setting state using the prevState callback argument here now, the linter will let you know when to do this
  handleChange = ({ target: { id, value }}) => {
    this.setState(prevState => ({ data: {...prevState.data, [id]: value } }))
  }


  render() {
    const { email, password } = this.state
    return (
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
            <button type="submit" className="button">Log In</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
