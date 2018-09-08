import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Layout } from 'antd'
import './Dashboard.less'
import './responsive.less'

import Sidebar from './Sidebar'
import DashboardHeader from './DashboardHeader'
import Record from './Record'

import { setViewRecordMode, setAddRecordMode } from 'Actions/recordForm'

import { 
  INIT_MODE,
  VIEW_RECORD_MODE,
  ADD_RECORD_MODE,
  EDIT_RECORD_MODE
} from 'Actions/types/recordForm'

const { Header, Footer, Content } = Layout

class App extends Component {
  addRecord = () => {
    this.props.setAddRecordMode()
  }

  displayRecord = (recordId) => {
    let record = this.props.records.find((record, id) => {
      return recordId === id
    })
    this.props.setViewRecordMode(record)
  }

  render() {
    return (
      <div className="dashboard">
        <Sidebar 
          displayRecord={this.displayRecord} 
          addRecord={this.addRecord}
          className="sidebar" 
        />
        <Layout className="dashboard-content">
          <Header style={{ background: '#fff', padding: 0 }}>
            <DashboardHeader displayRecord={this.displayRecord} />
          </Header>
          <Content>
            <Record 
              displayRecord={this.displayRecord}
              addRecord={this.addRecord}
            />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            TODO
          </Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  records: state.record,
  recordForm: state.recordForm
})

const mapDispatchToProps = (dispatch) => ({
  setViewRecordMode: (record) => dispatch(setViewRecordMode(record)),
  setAddRecordMode: () => dispatch(setAddRecordMode())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))