import React from 'react'
import { Form, Input, Tooltip, Icon, Row, Button, Spin, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { 
  INIT_MODE,
  VIEW_RECORD_MODE,
  ADD_RECORD_MODE,
  EDIT_RECORD_MODE
} from 'Actions/types/recordForm'

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
              <Input disabled={this.props.mode === VIEW_RECORD_MODE} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Website URL"
          >
            {getFieldDecorator('url', {
              rules: [{ required: true, message: 'Url is required' }],
            })(
              <Input disabled={this.props.mode === VIEW_RECORD_MODE} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Login name/email"
          >
            {getFieldDecorator('login', {
              rules: [{ required: true, message: 'Login name/email is required' }],
            })(
              <Input disabled={this.props.mode === VIEW_RECORD_MODE} />
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
              <Input disabled={this.props.mode === VIEW_RECORD_MODE} type="password" />
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
              <Input disabled={this.props.mode === VIEW_RECORD_MODE} type="notes" />
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    record: state.recordForm.record,
    mode: state.recordForm.mode
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
