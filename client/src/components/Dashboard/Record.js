import React from 'react'
import { Button, Spin } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ViewRecord from 'Components/Dashboard/ViewRecord'
import AddRecord from 'Components/Dashboard/AddRecord'
import EditRecord from 'Components/Dashboard/EditRecord'

/**
 * Record initialised mode state
 */
const INIT_MODE = 'init'

/**
 * Record on view mode
 */
const VIEW_RECORD_MODE = 'view'

/**
 * Adding new record
 */
const ADD_RECORD_MODE = 'add'

/**
 * Editing record
 */
const EDIT_RECORD_MODE = 'edit'

class Record extends React.Component {
  state = {
    mode: INIT_MODE,
    initLoading: true,
    actionLoading: false,
  }

  componentDidUpdate(props) {
    if (props.records.length !== this.props.records.length) {
      this.setState({initLoading: false})
    }

    if (this.props.record !== props.record) {
      this.setState({ mode: VIEW_RECORD_MODE })
    }
  }

  addRecord = () => {
    this.setState({ mode: ADD_RECORD_MODE })
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
        <Button type="primary" className="record-add-button" onClick={this.addRecord} htmlType="submit">Add Record</Button>
      </div>
    )
  }

  render() {
    if (this.state.initLoading) {
      return this.displayLoading()
    }

    if (this.state.mode === INIT_MODE && this.props.record === null) {
      return this.displayInitialScreen()
    }

    let recordForm
    if (this.state.mode === VIEW_RECORD_MODE) {
      recordForm = <ViewRecord record={this.props.record} />
    } else if (this.state.mode === ADD_RECORD_MODE) {
      recordForm = <AddRecord record={this.props.record} />
    } else {
      recordForm = <EditRecord record={this.props.record} />
    }

    return (
      <div>
        {/* todo little header with buttons add/edit */}
         {recordForm}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    records: state.record
  }    
}

export default withRouter(connect(mapStateToProps)(Record))
