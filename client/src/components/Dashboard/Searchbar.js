import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import { Icon, Button, Input, AutoComplete } from 'antd';

const Option = AutoComplete.Option;

class Searchbar extends React.Component {
  state = {
    dataSource: [],
  }

  onSelect(value) {
    console.log('onSelect', value);
  }
  
  getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
  }
  
  searchResult(query) {
    return (new Array(this.getRandomInt(5))).join('.').split('.')
      .map((item, idx) => ({
        query,
        category: `${query}${idx}`,
        count: this.getRandomInt(200, 100),
      }));
  }
  
  renderOption(item) {
    return (
      <Option key={item.category} text={item.category}>
        {item.query} 在
        <a
          href={`https://s.taobao.com/search?q=${item.query}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.category}
        </a>
        区块中
        <span className="global-search-item-count">约 {item.count} 个结果</span>
      </Option>
    );
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: value ? this.searchResult(value) : [],
    });
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
            placeholder="input here"
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

export default Searchbar