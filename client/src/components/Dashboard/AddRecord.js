import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'

import RecordForm from './RecordForm'
import { startAddRecord } from 'Actions/record'


class AddRecord extends React.Component {
  state = {
    actionLoading: false,
  }

  handleAddRecord = async (record) => {
    message.loading('Adding new record', 2.5)
    const res = await this.props.startAddRecord(record)
    message.destroy()
    if (res.success) {
      message.success('Record saved', 2.5)
    } else {
      message.error('Error saving record', 2.5)        
    }
  }

  render() {
    return (
      <RecordForm 
        record={this.props.record}
        handleRecordForm={this.handleAddRecord}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    startAddRecord: (record) => dispatch(startAddRecord(record))
})

export default withRouter(connect(undefined, mapDispatchToProps)(AddRecord))
