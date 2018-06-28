import React, { Component } from 'react';
import { Layout } from 'antd'
import Hero from './Hero'
import Features from './Features'
import './Homepage.less'

const { Header, Footer, Content } = Layout

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header>
            <h1 className="header__logo">Pwdlab</h1>
          </Header>
          <Content>
            <Hero />
            <Features />
          </Content>
          <Footer className="container">
            Made by Shay Segev | MIT license
          </Footer>
        </Layout>
      </div>
    );
  }
}

 export default App