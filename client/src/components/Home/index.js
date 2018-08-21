import React, { Component } from 'react';
import { Layout } from 'antd'
import Hero from './Hero'
import Features from './Features'
import './Homepage.less'
import './responsive.less'

const { Header, Footer, Content } = Layout

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header className="header-home">
            <h1 className="header__logo">Pwdlab</h1>
          </Header>
          <Content>
            <Hero />
            <Features />
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

 export default App