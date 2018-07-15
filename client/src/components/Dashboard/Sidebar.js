import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider, Content } = Layout

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <Sider 
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => { console.log(broken); }}
          onCollapse={(collapsed, type) => { console.log(collapsed, type)}}
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
          >
          <h1 className="logo">Pwdlab</h1>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    )
  }
}

export default Sidebar