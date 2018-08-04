import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'

import RecordForm from './RecordForm'
import { startEditRecord } from 'Actions/record'


class EditRecord extends React.Component {
  state = {
    actionLoading: false,
  }

  handleEditRecord = () => {

  }

  render() {
    return (
      <RecordForm 
        record={this.props.record}
        handleRecordForm={this.handleEditRecord}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    startEditRecord: (record) => dispatch(startEditRecord(record))
})

export default withRouter(connect(undefined, mapDispatchToProps)(EditRecord))
