import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { startSignUp } from 'Actions/auth'

import { Form, Icon, Input, Button, Alert } from 'antd'

const FormItem = Form.Item

class SignUpForm extends React.Component {
  state = {
    loading: false,
    alert: false,
    alertType: 'error'
  }
   
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ 
          loading: true,
          alertType: 'info',
          alert: 'Creating account and encryption keys, please wait.'
        })

        const res = await this.props.startSignUp(values)
        
        this.setState({ loading: false })
        if (res.success) {
          this.setState({ alertType: 'success', alert: 'You have registered successfully.' })
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
        <h3>Sign up for free.</h3>
        <Form onSubmit={this.handleSubmit} className="hero__signup--form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, type: 'email', message: 'Please input your email address' }],
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
          <Button 
            type="primary"
            size="large"
            htmlType="submit"
            className="hero__signup--form-button"
            loading={this.state.loading}
          >
            Register
          </Button>
          {this.state.alert && <Alert message={this.state.alert} type={this.state.alertType} />}
          </Form>
      </div>
    )
  }
}

const WrappedSignUpForm = Form.create()(SignUpForm)

const mapStateToProps = (state) => {
  return {
    email: state.auth.email
  }    
}

const mapDispatchToProps = (dispatch) => ({
    startSignUp: (user) => dispatch(startSignUp(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedSignUpForm))
