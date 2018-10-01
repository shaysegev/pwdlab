import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { startLogin, login } from 'Actions/auth'

import { Form, Alert, Icon, Input, Button, Modal } from 'antd'
const FormItem = Form.Item

class LoginForm extends React.Component {
  state = {
    loading: false,
    alert: false,
    alertType: 'error'
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true, alert: false })

        const res = await this.props.startLogin(values)
        this.setState({ loading: false })
        if (res.success) {
          // TODO present an alert box if res.deviceAlert is not null
          // Which means the user will have to authenticate the new device before proceeding
          // Once a user authenticates the device, we can add it to the list of auth devices
          // And let the user through
          // Implements with 2FA
          this.setState({ alertType: 'success', alert: 'You have successfully logged in.' })
          this.props.login(res.user)
        } else {
          this.setState({ alertType: 'error', alert: res.msg })
        }        
      }
    });
  }

  forgotPassword = () => {
    Modal.info({
      title: 'Work in progress',
      content: (
        <div>
          <p>
            This project is an MVP (Minimum Viable Product), 
            and currently contains the minimum main functionality required by the application.
          </p>
          <p>You can view the project on <a href="https://github.com/shaysegev/pwdlab" target="_blank" rel="noopener noreferrer">Github</a>.</p>
        </div>
      ),
      onOk() {},
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h3>Log in to your account.</h3>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, type: 'email', message: 'Please input your email address!' }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, min: 6, message: 'Password must contain more than six characters' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
              loading={this.state.loading} 
              >
              Log in
            </Button>
            <a className="login-form-forgot" onClick={this.forgotPassword}>Forgot password?</a>
          </FormItem>
          {this.state.alert && <Alert message={this.state.alert} type={this.state.alertType} />}
        </Form>
      </div>
    )
  }
}

const WrappedLoginForm = Form.create()(LoginForm)

const mapStateToProps = (state) => {
  return {
    email: state.auth.email
  }    
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: (user) => dispatch(startLogin(user)),
    login: (user) => dispatch(login(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm))