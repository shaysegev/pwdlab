import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'

import RecordForm from './RecordForm'
import { startEditRecord } from 'Actions/record'
import { setViewRecordMode } from 'Actions/recordForm'

class EditRecord extends React.Component {
  state = {
    actionLoading: false,
  }

  handleEditRecord = async (record) => {
    message.loading('Editing record', 2.5)
    const res = await this.props.startEditRecord(record)
    message.destroy()
    if (res.success) {
      message.success('Record updated', 2.5)
      this.props.setViewRecordMode(record)
    } else {
      message.error('Error updating record', 2.5)
    }
  }

  render() {
    return (
      <RecordForm 
        handleSubmit={this.handleEditRecord}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    startEditRecord: (record) => dispatch(startEditRecord(record)),
    setViewRecordMode: (record) => dispatch(setViewRecordMode(record))
})

export default withRouter(connect(undefined, mapDispatchToProps)(EditRecord))
