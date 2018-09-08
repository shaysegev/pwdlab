import React from 'react'
import { Row, Col, Icon } from 'antd'

const Features = () => (
  <div className="features__background">
    <h1 className="features__main__title">Everything you need to manage your passwords.</h1>
    <Row type="flex" gutter={8} justify="space-between" className="features container">
      <Col md={8} className="features__desc">
        <Icon className="features__icon" type="check-circle-o" />
        <h2 className="features__title">Strong Encryption</h2>
        <p className="features__content">All data is stored encrypted including your personal details, so only you have access to your own passwords.</p>
      </Col>
      <Col md={8} className="features__desc">
        <Icon className="features__icon" type="code" />
        <h2 className="features__title">Open Source</h2>
        <p className="features__content">The software is transparent and licensed under MIT.</p>
      </Col>
      <Col md={8} className="features__desc">
        <Icon className="features__icon" type="calculator" />
        <h2 className="features__title">Powerful Passwords</h2>
        <p className="features__content">Store powerful and safe passwords for each website, so you won't have to remember them ever again.</p>
      </Col>
    </Row>
  </div>
)

export default Features