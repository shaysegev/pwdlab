import React from 'react'
import { Button, Spin, Row } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ViewRecord from 'Components/Dashboard/ViewRecord'
import AddRecord from 'Components/Dashboard/AddRecord'
import EditRecord from 'Components/Dashboard/EditRecord'

import { setInitRecordMode } from 'Actions/recordForm'

import { 
  INIT_MODE,
  VIEW_RECORD_MODE,
  ADD_RECORD_MODE,
  EDIT_RECORD_MODE
} from 'Actions/types/recordForm'

class Record extends React.Component {
  state = {
    initLoading: true,
    actionLoading: false,
  }

  componentDidMount() {
    this.props.setInitRecordMode()
  }

  componentDidUpdate(props) {
    if (props.records.length !== this.props.records.length) {
      this.setState({initLoading: false})
    }
  }

  displayLoading() {
    return (
      <div className="record-add">
        <p>Getting records...</p>
        <Spin size="large" />
      </div>
    )
  }

  displayInitialScreen() {
    return (
      <div className="record record-add">
        <h3>
          {!this.props.records.length ? 'No records found. Enter your first!' : 'Select/search for a record or add a new one.'}
        </h3>
        <Button type="primary" className="record-add-button" onClick={this.props.addRecord} htmlType="submit">Add Record</Button>
      </div>
    )
  }

  render() {
    if (this.state.initLoading) {
      return this.displayLoading()
    }

    if (this.props.mode === INIT_MODE && this.props.record === null) {
      return this.displayInitialScreen()
    }

    let recordForm
    if (this.props.mode === VIEW_RECORD_MODE) {
      recordForm = <ViewRecord />
    } else if (this.props.mode === ADD_RECORD_MODE) {
      recordForm = <AddRecord />
    } else if (this.props.mode === EDIT_RECORD_MODE) {
      recordForm = <EditRecord />
    }

    return (
      <div>
        {React.cloneElement(recordForm)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  records: state.record,
  record: state.recordForm.record,
  mode: state.recordForm.mode
})

const mapDispatchToProps = (dispatch) => ({
  setInitRecordMode: () => dispatch(setInitRecordMode())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Record))
