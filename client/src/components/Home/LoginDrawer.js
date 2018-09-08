import React from 'react'
import { Drawer } from 'antd'

import LoginForm from './LoginForm'

class LoginDrawer extends React.Component {
  render() {
    return (
      <div className="login__drawer">
        <Drawer
          width={350}
          placement="right"
          onClose={this.props.onClose}
          maskClosable={false}
          visible={this.props.visible}
        >
          <LoginForm />
        </Drawer>
      </div>
    )
  }
}

export default LoginDrawer