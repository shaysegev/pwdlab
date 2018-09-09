import React from 'react'
import { connect } from 'react-redux'
import { Row, Button, Popconfirm } from 'antd'

import { VIEW_RECORD_MODE } from 'Actions/types/recordForm'

class RecordHeader extends React.Component {
  state = {
    deletePopupVisible: false
  }

  handlePopupVisibleChange = (deletePopupVisible) => {
    if (!deletePopupVisible) {
      this.setState({ deletePopupVisible })
      return
    }

    if (this.state.condition) {
      // Confirmed
      this.props.handleDeleteRecord()
    } else {
      // Show the pre-delete popup
      this.setState({ deletePopupVisible })
    }
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="end" className="record-header">
         {this.props.mode === VIEW_RECORD_MODE && 
          <div>
            <Button type="primary" icon="form" onClick={this.props.editRecord}>Edit</Button>
            <Popconfirm
              title="Are you sure you wish to delete this record?"
              placement="bottomRight"
              visible={this.state.deletePopupVisible}
              onVisibleChange={this.handlePopupVisibleChange}
              onConfirm={this.props.handleDeleteRecord}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" icon="close">Delete</Button>
            </Popconfirm>
          </div>
        }
          {this.props.isEditable() && 
            <div>
              <Button type="danger" onClick={this.props.cancelAction}>Cancel</Button>
              <Button type="primary" onClick={this.props.handleSubmit}>Save</Button>
            </div>
          }
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  mode: state.recordForm.mode
})

export default connect(mapStateToProps)(RecordHeader)
