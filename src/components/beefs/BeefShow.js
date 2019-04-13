import React from 'react'

import axios from 'axios'

class BeefShow extends React.Component {
  async componentDidMount() {
    const { match } = this.props
    const res = await axios.get(`/api/beefs/${match.params.id}`)
    this.setState({ beef: res.data })
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
