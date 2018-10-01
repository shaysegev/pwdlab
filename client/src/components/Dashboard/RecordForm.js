import React from 'react'
import { Form, Input, Tooltip, Button, Icon, Switch, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import RecordHeader from 'Components/Dashboard/RecordHeader'
import PasswordHandler from 'Components/Dashboard/PasswordHandler'

import { startDeleteRecord } from 'Actions/record'

import {
  setInitRecordMode,
  setViewRecordMode,
  setEditRecordMode
} from 'Actions/recordForm'

import { 
  VIEW_RECORD_MODE,
  ADD_RECORD_MODE,
  EDIT_RECORD_MODE 
} from 'Actions/types/recordForm'

const FormItem = Form.Item;

class RecordForm extends React.Component {
  state = {
    displayPassword: false,
  }

  cancelAction = () => {
    if (this.props.mode === EDIT_RECORD_MODE) {
      this.props.setViewRecordMode(this.props.record)
    } else {
      this.props.setInitRecordMode()
    }
  }

  editRecord = () => {
    this.props.setEditRecordMode(this.props.record)
  }

  isEditable = () => {
    return this.props.mode === EDIT_RECORD_MODE || this.props.mode === ADD_RECORD_MODE
  }

  setPassword = (password) => {
    this.props.form.setFieldsValue({ password })
  }

  copyPassword = () => {
    navigator.clipboard.writeText(this.props.form.getFieldValue('password'))
    message.success('Password copied to clipboard')
  }

  togglePasswordDisplay = () => {
    this.setState({displayPassword: !this.state.displayPassword})
  }

  displayPassword = () => {
    this.setState({displayPassword: true})
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return message.error('Please fill all the required fields', 2.5)
      }
      // Adding the record identifier (if available) to the form values
      values._id = this.props.record ? this.props.record._id : undefined
      this.props.handleSubmit(values)
    })
  }

  handleDeleteRecord = async () => {
    message.loading('Deleting record', 2.5)
    const res = await this.props.startDeleteRecord(this.props.record._id)
    message.destroy()
    if (res.success) {
      message.success('Record deleted', 2.5)
    this.props.setInitRecordMode()
    } else {
      message.error('Error deleting record', 2.5)
    }
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
          handleDeleteRecord={this.handleDeleteRecord}
          editRecord={this.editRecord}
          isEditable={this.isEditable}
          cancelAction={this.cancelAction}
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
            <div className="record-password">
              <FormItem
                {...formItemLayout}
                label="Password"
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'A password is required',
                  }],
                })(
                  <Input
                    size="large"
                    disabled={this.props.mode === VIEW_RECORD_MODE}
                    type={this.state.displayPassword ? 'text': 'password'}
                  />
                )}
              </FormItem>
              <div className="record-password--actions">
                <Button
                  type="primary"
                  shape="circle"
                  icon="copy"
                  onClick={this.copyPassword}
                />
                <Switch 
                  checkedChildren="Show"
                  unCheckedChildren="Hide"
                  onChange={this.togglePasswordDisplay}
                  style={{marginLeft: "5px"}}
                />
              </div>
            </div>
            {this.isEditable() &&
              <PasswordHandler 
                password={this.props.form.getFieldValue('password')}
                setPassword={this.setPassword}
                displayPassword={this.displayPassword}
              ></PasswordHandler>
            }
            <FormItem
              {...formItemLayout}
              className="record-notes"
              label={(
                <span>
                  Notes&nbsp;
                  <Tooltip title="Relevant notes">
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
  setInitRecordMode: () => dispatch(setInitRecordMode()),
  setViewRecordMode: (record) => dispatch(setViewRecordMode(record)),
  setEditRecordMode: (record) => dispatch(setEditRecordMode(record)),
  startDeleteRecord: (record) => dispatch(startDeleteRecord(record))
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
