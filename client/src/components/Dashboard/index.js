import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import './Dashboard.less'
import '../../styles/dashboard/responsive.less'

import Sidebar from './Sidebar'
import Searchbar from './Searchbar'

const { Header, Footer, Content } = Layout

class App extends Component {
  render() {
    return (
      <div className="dashboard">
        <Sidebar className="sidebar" />
        
        <Layout className="dashboard-content">
          <Header style={{ background: '#fff', padding: 0 }}>
            <Searchbar />
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              ...
              <br />
              Really
              <br />...<br />...<br />...<br />
              long
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    );
  }
}

 export default withRouter(App)