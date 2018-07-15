import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { startLogin } from 'Actions/auth'

import { Form, Alert, Icon, Input, Button, Checkbox } from 'antd'
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
          this.props.history.push('/dashboard')            
          this.setState({ alertType: 'success', alert: 'You have successfully logged in.' })
        } else {
          this.setState({ alertType: 'error', alert: res.msg })
        }        
      }
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
              rules: [{ required: true, message: 'Please input your email address!' }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
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
            <a className="login-form-forgot" href="">Forgot password?</a>
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
    startLogin: (user) => dispatch(startLogin(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm))