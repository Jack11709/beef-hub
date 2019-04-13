import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper black">
        <ul id="nav-mobile" className="right">
          <li><Link to="/addbeef">New Beef</Link></li>
          <li><Link to="/users/profile">My Beefs</Link></li>
          <li><Link to="/beefs" className="brand-logo center"><img width="150" alt="cow" src="https://dumielauxepices.net/sites/default/files/horns-clipart-carabao-642524-3668719.jpg" /></Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)

// <ul id="nav-mobile" className="right hide-on-med-and-down">
//   <li><a href="sass.html">Sass</a></li>
//   <li><a href="badges.html">Components</a></li>
//   <li><a href="collapsible.html">JavaScript</a></li>
// </ul>
