import React from 'react'

import { Layout, Menu } from 'antd'

const { Sider } = Layout

class Sidebar extends React.Component {
  renderMenu() {
    return (
      <Menu theme="dark" mode="inline">
        {this.props.records.map((record, index) => {
          return (
            <Menu.Item key={index} onClick={(e) => this.props.displayRecord(index)}>
              <span className="nav-text">{record.title}</span>
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }

  render() {
    return (
      <div>
        <Sider 
          breakpoint="lg"
          collapsedWidth="0"
          width="300px"
          onBreakpoint={(broken) => { console.log(broken); }}
          onCollapse={(collapsed, type) => { console.log(collapsed, type)}}
          style={{ overflow: 'auto', height: '100vh', position: 'fixed' }}
          >
            <h1 className="logo">Pwdlab</h1>
            {!this.props.records.length ? (
              <p>no records found</p>
            ) : (
              this.renderMenu()
            )}
        </Sider>
      </div>
    )
  }
}

export default Sidebar