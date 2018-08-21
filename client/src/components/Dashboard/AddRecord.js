import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'

import RecordForm from './RecordForm'
import { startAddRecord } from 'Actions/record'

import { setViewRecordMode } from 'Actions/recordForm'

class AddRecord extends React.Component {
  state = {
    actionLoading: false,
  }

  handleAddRecord = async (record) => {
    message.loading('Adding new record', 2.5)
    const res = await this.props.startAddRecord(record)
    message.destroy()
    if (res.success) {
      this.props.setViewRecordMode(res.record)
      message.success('Record saved', 2.5)
    } else {
      message.error('Error saving record', 2.5)
    }
  }

  render() {
    return (
      <RecordForm 
        handleSubmit={this.handleAddRecord}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    startAddRecord: (record) => dispatch(startAddRecord(record)),
    setViewRecordMode: (record) => dispatch(setViewRecordMode(record)),
})

export default withRouter(connect(undefined, mapDispatchToProps)(AddRecord))
