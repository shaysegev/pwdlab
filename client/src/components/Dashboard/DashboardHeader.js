import React from 'react'
import { connect } from 'react-redux'

import { Popover, Modal, Icon, Button, Input, AutoComplete, message } from 'antd'
import { startLogout } from 'Actions/auth'

const Option = AutoComplete.Option

class DashboardHeader extends React.Component {
  state = {
    dataSource: [],
  }

  onSelect = (index) => {
    this.props.displayRecord(parseInt(index))
  }
  
  searchResult(query) {
    return this.props.records.map((record, index) => {
      // Display matching titles first
      if (record.title.toLowerCase().includes(query)) {
        return {
          query,
          index,
          option: record.title,
        }
      }
      // No title found, do we have a url match?
      if (record.url.toLowerCase().includes(query)) {
        return {
          query,
          index,
          option: record.url,
        }
      }
      // Clear all undefined results
    }).filter(record => typeof record !== 'undefined');
  }
  
  renderOption(item) {
    return (
      <Option key={item.index} text={item.option}>
        {item.option}
      </Option>
    );
  }

  handleSearch = (value) => {
    let result
    if (!value) {
      result = []
    } else {
      result = this.searchResult(value)
    }
    this.setState({ dataSource: result });
  }

  settings = () => {
    Modal.info({
      title: 'Work in progress',
      content: (
        <div>
          <p>
            This project is an MVP (Minimum Viable Product), 
            and currently contains the minimum main functionality required by the application.
          </p>
          <p>You can view the project on <a href="https://github.com/shaysegev/pwdlab" target="_blank">Github</a></p>
        </div>
      ),
      onOk() {},
    });
  }

  logout = () => {
    this.props.startLogout()
    message.success('You have logged out successfully.', 2.5)
  }

  render() {
    return (
      <div className="dashboard-header">
        <div className="search">
          <AutoComplete
            className="search-wrapper"
            size="large"
            style={{ width: '100%' }}
            dataSource={this.state.dataSource.map(this.renderOption)}
            onSelect={this.onSelect}
            onSearch={this.handleSearch}
            placeholder="Search your passwords"
            optionLabelProp="text"
          >
            <Input
              suffix={(
                <Button className="search-btn" size="large" type="primary">
                  <Icon type="search" />
                </Button>
              )}
            />
          </AutoComplete>
        </div>
        <div>
          <Popover 
            placement="bottomRight"
            overlayClassName="dashboard__popover"
            content={
              <div className="dashboard__popover__menu">
                <a className="dashboard__popover__link" onClick={this.settings}>
                  <Icon type="setting" /> 
                  <span>Settings</span>
                </a>
                <a className="dashboard__popover__link" onClick={this.logout}>
                  <Icon type="logout" /> 
                  <span>Logout</span>
                </a>
              </div>
            }
            trigger="click"
          >
            <Button 
              size="large"
              shape="circle"
              icon="ellipsis"
            ></Button>
          </Popover>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  records: state.record,
})

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader)