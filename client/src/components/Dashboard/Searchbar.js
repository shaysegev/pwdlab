import React from 'react'
import { connect } from 'react-redux'

import { Icon, Button, Input, AutoComplete } from 'antd';

const Option = AutoComplete.Option;

class Searchbar extends React.Component {
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
        <div>LOGOUT/github</div>
      </div>
    );
  }
}

// todo github/logout icons

const mapStateToProps = (state) => ({
  records: state.record,
})

export default connect(mapStateToProps)(Searchbar)