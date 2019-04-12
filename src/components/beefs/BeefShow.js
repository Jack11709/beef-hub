import React from 'react'

import axios from 'axios'

class BeefShow extends React.Component {
  componentDidMount() {
    const { match } = this.props
    axios.get(`/api/beefs/${match.params.id}`)
      .then(res => this.setState({ beef: res.data }))
  }


  render() {
    if (!this.state) return null
    const { beef } = this.state
    return (
      <div>
        <h2>{beef.beefee.username}</h2>
      </div>
    )
  }
}


export default BeefShow
