import React from 'react'
import { withRouter } from 'react-router-dom'

import RecordForm from './RecordForm'

class ViewRecord extends React.Component {
  render() {
    return (
      <RecordForm record={this.props.record} />
    )
  }
}

export default withRouter(ViewRecord)
