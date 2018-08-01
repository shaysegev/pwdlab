import React from 'react'
import { Form, Input, Tooltip, Icon,  Button, Spin, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { startSaveRecord } from 'Actions/record'

const FormItem = Form.Item;

class EditRecord extends React.Component {
  state = {
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
  }})(EditRecord)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedRecord))
