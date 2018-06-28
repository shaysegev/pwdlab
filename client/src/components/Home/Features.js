import React from 'react'
import { Row, Col, Icon } from 'antd'

const Features = () => (
  <div>
    <Row type="flex" justify="space-between" className="features container">
      <Col className="features__desc">
        <Icon className="features__icon" type="check-circle-o" />
        <h2 className="features__title">Lorem, ipsum.</h2>
        <p className="features__content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </Col>
      <Col className="features__desc">
        <Icon className="features__icon" type="code" />
        <h2 className="features__title">Lorem, ipsum.</h2>
        <p className="features__content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </Col>
      <Col className="features__desc">
        <Icon className="features__icon" type="calculator" />
        <h2 className="features__title">Lorem, ipsum.</h2>
        <p className="features__content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </Col>
    </Row>
  </div>
)

export default Features