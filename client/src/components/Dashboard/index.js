import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Layout } from 'antd'
import './Dashboard.less'
import '../../styles/dashboard/responsive.less'

import Sidebar from './Sidebar'
import Searchbar from './Searchbar'
import Record from './Record'

const { Header, Footer, Content } = Layout

class App extends Component {
  state = {
    record: null
  }

  displayRecord = (recordId) => {
    let record = this.props.records.find((record, id) => {
      return recordId === id
    })
    this.setState({ record })
  }

  render() {
    return (
      <div className="dashboard">
        <Sidebar records={this.props.records} displayRecord={this.displayRecord} className="sidebar" />
        
        <Layout className="dashboard-content">
          <Header style={{ background: '#fff', padding: 0 }}>
            <Searchbar records={this.props.records} displayRecord={this.displayRecord} />
          </Header>
          <Content>
            <Record record={this.state.record} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            TODO
          </Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    records: state.record
  }
}

export default withRouter(connect(mapStateToProps)(App))