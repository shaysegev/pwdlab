import React from 'react'
import { Form, Input, Tooltip, Icon,  Button, Spin, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { startSaveRecord } from 'Actions/record'

const FormItem = Form.Item;

class ViewRecord extends React.Component {
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
              <Input disabled={true} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Website URL"
          >
            {getFieldDecorator('url', {
              rules: [{ required: true, message: 'Url is required' }],
            })(
              <Input disabled={true} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Login name/email"
          >
            {getFieldDecorator('login', {
              rules: [{ required: true, message: 'Login name/email is required' }],
            })(
              <Input disabled={true} />
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
              <Input disabled={true} type="password" />
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
              <Input disabled={true} type="notes" />
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

const mapDispatchToProps = (dispatch) => ({
    startSaveRecord: (record) => dispatch(startSaveRecord(record))
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
  }})(ViewRecord)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedRecord))
