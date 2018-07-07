import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { isLoggedIn } from '../../auth'
import { Layout } from 'antd'
import './Dashboard.less'

const { Header, Footer, Content } = Layout

class App extends Component {
  // componentWillMount() {
  //   if (!isLoggedIn()) {
  //     this.props.history.push('/')
  //   }
  // }
  render() {
    return (
      <div className="App">
        <Layout>
          <Header>
            <h1 className="header__logo">Pwdlab</h1>
          </Header>
          <Content>
            Dashboard page
          </Content>
          <Footer>
            <p className="container">
              Made by Shay Segev | MIT license
            </p>
          </Footer>
        </Layout>
      </div>
    );
  }
}

 export default withRouter(App)