import React from 'react'
import { Button, Spin } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ViewRecord from 'Components/Dashboard/ViewRecord'
import EditRecord from 'Components/Dashboard/EditRecord'

const INIT_MODE = 'init'
const VIEW_MODE = 'view'
const EDIT_MODE = 'edit'

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
      this.setState({ mode: VIEW_MODE })
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
          {!this.props.records.length ? 'No records found. Enter your first!' : 'Select a record or add a new one below.'}
        </h3>
        <Button type="primary" className="record-add-button" onClick={this.viewRecord} htmlType="submit">Add Record</Button>
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

    return (
      <div>
        {/* todo little header with buttons add/edit */}
        {this.state.mode === VIEW_MODE ? (
          <ViewRecord record={this.props.record} />
        ) : (
          <EditRecord record={this.props.record} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    records: state.record
  }    
}

export default withRouter(connect(mapStateToProps)(Record))
