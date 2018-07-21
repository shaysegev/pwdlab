import React from 'react'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import { Row, Col, Tabs } from 'antd'

const TabPane = Tabs.TabPane

const Hero = () => (
  <div className="hero__gradient">
    <div className="container">
      <Row className="hero">
        <Col md={12} sm={24}>
          <h2 className="hero__title">Secure your passwords.</h2>
          <h3 className="hero__subtitle">Access anywhere. Anytime.</h3>
        </Col>
        <Col md={12} sm={24}>
          <div className="hero__forms">
            <Tabs tabPosition="bottom">
              <TabPane tab="Sign up" key="1">
                <SignUpForm className="hero__signup" />
              </TabPane>
              <TabPane tab="Login" key="2">
                <LoginForm />
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </div>
  </div>
)

export default Hero