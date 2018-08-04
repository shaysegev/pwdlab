import React from 'react'
import { Form, Input, Tooltip, Icon,  Button, Spin, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const FormItem = Form.Item;

class RecordForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return message.error('Please fill all the required fields', 2.5)
      }
      
      this.props.handleRecordForm(values)
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 }
      }
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
                <Tooltip title="Personal notes">
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
            <Button type="primary" htmlType="submit">Save</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    records: state.record
  }
}

const WrappedRecord = Form.create({
  mapPropsToFields(props) {
    if (props.record === null) {
      return
    }

    // Populate form fields on changed state
    let populatedForm = {}
    Object.keys(props.record).filter((field) => {
      if (field === '_id') return
      return populatedForm[field] = Form.createFormField({
        value: props.record[field],
      })
    })

    return populatedForm
  }})(RecordForm)

export default withRouter(connect(mapStateToProps)(WrappedRecord))
