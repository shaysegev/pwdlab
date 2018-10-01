import React, { Component } from 'react';
import { Layout, Button } from 'antd'
import LoginDrawer from './LoginDrawer'
import Hero from './Hero'
import Features from './Features'
import './Homepage.less'
import './responsive.less'

const { Header, Footer, Content } = Layout

class App extends Component {
  state = { 
    drawerVisible: false 
  }

  displayLoginDrawer = () => {
    this.setState({ drawerVisible: true })
  }

  closeLoginDrawer = () => {
    this.setState({ drawerVisible: false })
  }

  render() {
    return (
      <div className="home">
        <Layout>
          <LoginDrawer
            visible={this.state.drawerVisible} 
            onClose={this.closeLoginDrawer}
          />
          <Header className="header__home">
            <div>
              <h1 className="header__logo__name">Pwdlab</h1>
              <p className="header__logo__slogan">Open-source password manager</p>  
            </div>
            <Button onClick={this.displayLoginDrawer} className="header__login__button">Login</Button>
          </Header>
          <Content>
            <Hero />
            <Features />
          </Content>
          <Footer>
            <p className="container">
              Made by Shay Segev | MIT license
              <Button
                shape="circle"
                icon="github"
                href="https://github.com/shaysegev/pwdlab"
                target="_blank"
                rel="noopener noreferrer"
                style={{marginLeft: '5px'}}
              ></Button>
            </p>
          </Footer>
        </Layout>
      </div>
    );
  }
}

 export default App