import React from 'react'
import { Form, Input, Tooltip, Icon,  Button, Spin, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { startAddRecord } from 'Actions/record'

const FormItem = Form.Item;

class Record extends React.Component {
  state = {
    mode: 'add',
    initLoading: true,
    actionLoading: false,
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        return message.error('Please fill all the required fields', 2.5)
      }
      
      message.loading('Saving new record', 2.5)
      const res = await this.props.startAddRecord(values)
      message.destroy()
      if (res.success) {
        message.success('Record saved', 2.5)
      } else {
        message.error('Error saving record', 2.5)        
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 }
      }
    };

    // todo if no records found
    // if (1) {
    //   return (
    //     <div className="record record-add">
    //       <h3>No records found. Enter your first!</h3>
    //       <Button type="primary" className="record-add-button" htmlType="submit">Add Record</Button>
    //     </div>
    //   )
    // }

    if (this.state.initLoading) {
      // todo wait for API
      setTimeout(() => {
        this.setState({initLoading: false});
      }, 2000)
      return (
        <div className="record-add">
          <p>Getting records...</p>
          <Spin size="large" />
        </div>
      )
    }

    return (
      <div className="record">
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <FormItem
            {...formItemLayout}
            label="Title"
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'A title is required' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Website URL"
          >
            {getFieldDecorator('url', {
              rules: [{ required: true, message: 'Url is required' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Login name/email"
          >
            {getFieldDecorator('login', {
              rules: [{ required: true, message: 'Login name/email is required' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'A password is required',
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Notes&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('notes', {
              rules: [{
                required: false,
              }],
            })(
              <Input type="notes" />
            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.email
  }    
}

const mapDispatchToProps = (dispatch) => ({
    startAddRecord: (record) => dispatch(startAddRecord(record))
})

const WrappedRecord = Form.create()(Record)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedRecord))
