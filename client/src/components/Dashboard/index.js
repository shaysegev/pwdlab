import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import './Dashboard.less'
import '../../styles/dashboard/responsive.less'

import Sidebar from './Sidebar'
import Searchbar from './Searchbar'
import Record from './Record'

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
          <Content>
            <Record />
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