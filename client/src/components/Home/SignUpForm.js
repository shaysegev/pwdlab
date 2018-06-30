import React from 'react'
import User from 'Models/User'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

class SignUpForm extends React.Component {
  state = {
    loading: false
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const user = new User()
        user.signUp(values).then((res) => {
          console.log(res);
        }).catch((e) => {
          console.log(e)
        })

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h3>Sign up for free.</h3>
        <Form onSubmit={this.handleSubmit} className="SignUp-form">
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
              Register
            </Button>
          </FormItem>
          </Form>
      </div>
    )
  }
}

const WrappedSignUpForm = Form.create()(SignUpForm)

export default WrappedSignUpForm