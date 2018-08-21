import React from 'react'
import { Form, Input, Tooltip, Icon, Row, Button, Spin, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import RecordHeader from 'Components/Dashboard/RecordHeader'

import {
  setViewRecordMode,
  setAddRecordMode,
  setEditRecordMode
} from 'Actions/recordForm'

import { VIEW_RECORD_MODE } from 'Actions/types/recordForm'

const FormItem = Form.Item;

class RecordForm extends React.Component {  
  editRecord = () => {
    this.props.setEditRecordMode(this.props.record)
  }

  deleteRecord = () => {
    // todo
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return message.error('Please fill all the required fields', 2.5)
      }
      this.props.handleSubmit(values)
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
      <div>
        <RecordHeader
          handleSubmit={this.handleSubmit}
          editRecord={this.editRecord}
          deleteRecord={this.deleteRecord}
        />
        <div className="record">
          <Form layout="vertical">
            <FormItem
              {...formItemLayout}
              label="Title"
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'A title is required' }],
              })(
                <Input size="large" disabled={this.props.mode === VIEW_RECORD_MODE} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Website URL"
            >
              {getFieldDecorator('url', {
                rules: [{ required: true, message: 'Url is required' }],
              })(
                <Input size="large" disabled={this.props.mode === VIEW_RECORD_MODE} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Login name/email"
            >
              {getFieldDecorator('login', {
                rules: [{ required: true, message: 'Login name/email is required' }],
              })(
                <Input size="large" disabled={this.props.mode === VIEW_RECORD_MODE} />
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
                <Input size="large" disabled={this.props.mode === VIEW_RECORD_MODE} type="password" />
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
                <Input size="large" disabled={this.props.mode === VIEW_RECORD_MODE} type="notes" />
              )}
            </FormItem>
          </Form>
        </div>
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

const mapDispatchToProps = (dispatch) => ({
  setViewRecordMode: (record) => dispatch(setViewRecordMode(record)),
  setEditRecordMode: (record) => dispatch(setEditRecordMode(record))
})

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedRecord))
