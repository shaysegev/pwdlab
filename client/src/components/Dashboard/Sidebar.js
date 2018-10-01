import React from 'react'
import { connect } from 'react-redux'

import { Layout, Menu, Button } from 'antd'

const { Sider } = Layout

class Sidebar extends React.Component {
  renderMenu() {
    return (
      <Menu theme="dark" mode="inline" selectedKeys={['null']}>
        {this.props.records.map((record, index) => {
          return (
            <Menu.Item 
              key={index} 
              style={{background: this.props.record && record._id === this.props.record._id ? '#6137ad' : null}}
              onClick={() => this.props.displayRecord(index)}>
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
          style={{ overflow: 'auto', height: '100vh', position: 'fixed' }}
          >
            <h1 className="logo">Pwdlab</h1>
            <Button 
              type="primary" 
              className="record-add-button--sidebar"
              icon="plus"
              onClick={this.props.addRecord}
            >
              New Record
            </Button>
            {this.props.records.length && this.renderMenu()}
        </Sider>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  records: state.record,
  record: state.recordForm.record,
})

export default connect(mapStateToProps)(Sidebar)