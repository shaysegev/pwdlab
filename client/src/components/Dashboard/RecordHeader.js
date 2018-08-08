import React from 'react'
import { Row, Button } from 'antd'

import { 
  VIEW_RECORD_MODE,
  ADD_RECORD_MODE,
  EDIT_RECORD_MODE,
} from 'Actions/types/recordForm'

class RecordHeader extends React.Component {
  displaySaveButton() {
    return this.props.mode === EDIT_RECORD_MODE || this.props.mode === ADD_RECORD_MODE
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="end" className="record-header">
         {this.props.mode !== ADD_RECORD_MODE &&
          <Button type="primary" onClick={this.props.addRecord}>New Record</Button>}
         {this.props.mode === VIEW_RECORD_MODE && 
          <div>
            <Button type="primary" onClick={this.props.editRecord}>Edit</Button>
            <Button type="primary" onClick={this.props.deleteRecord}>Delete</Button>
          </div>
        }
          {this.displaySaveButton() && 
          <Button type="primary" className="record-save" onClick={this.handleSubmit}>Save</Button>}
        </Row>
      </div>
    )
  }
}

export default RecordHeader
