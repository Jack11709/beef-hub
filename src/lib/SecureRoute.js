import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import Auth from './Auth'

const SecureRoute = ({component: Component, ...otherProps }) => {
  if (Auth.isAuthenticated()) return <Route {...otherProps} component={Component} />

  return <Redirect to="/login" />
}

export default SecureRoute
