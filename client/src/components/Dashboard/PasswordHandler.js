import React from 'react'
import { connect } from 'react-redux'
import zxcvbn from 'zxcvbn'
import { generate as generatePassword } from 'generate-password';

import { Row, Col, Checkbox, Slider, Progress } from 'antd'

import { ADD_RECORD_MODE } from 'Actions/types/recordForm'

const CheckboxGroup = Checkbox.Group

// @TODO change progress bar color after framework fix

class PasswordHandler extends React.Component {
  state = {
    passwordScore: 0,
    passwordLength: 12,
    passwordOptions: ['Uppercase', 'Numbers', 'Symbols'],
    activePasswordOptions: ['Uppercase', 'Numbers', 'Symbols'],
  }
  
  handleOptionsChange = async (checkedValues) => {
    await this.setState({activePasswordOptions: checkedValues})
    this.generatePassword()
  }

  handleLengthChange = async (value) => {
    await this.setState({passwordLength: value})
    this.generatePassword()
  }

  generatePassword() {
    const password = generatePassword({
      length: this.state.passwordLength,
      uppercase: this.state.activePasswordOptions.includes('Uppercase'),
      numbers: this.state.activePasswordOptions.includes('Numbers'),
      symbols: this.state.activePasswordOptions.includes('Symbols'),
    })

    this.props.setPassword(password)
  }

  componentWillMount() {
    if (this.props.mode === ADD_RECORD_MODE) {
      this.generatePassword()
    } else {
      this.calculatePasswordStrength()      
    }
  }

  componentDidUpdate(props) {
    if (props.password !== this.props.password) {
      this.calculatePasswordStrength()    
    }
  }

  calculatePasswordStrength() {
    const password = zxcvbn(this.props.password)    
    let passwordScore = password.score
    // Increment score for calculation in case the password is not empty
    passwordScore += (!this.props.password.length) ? 0 : 1
    // Calculate to fit the progress bar width in percentage
    passwordScore *= 2 * 10
    this.setState({passwordScore: passwordScore})
  }

  render() {
    return (
      <div className="record-password-meter">
        <Row type="flex">
          <Col xs={24} sm={12}>
            <Slider
              min={4}
              max={32}
              defaultValue={this.state.passwordLength}
              onChange={this.handleLengthChange}
            />
          </Col>
          <Col xs={24} sm={12}>
            <CheckboxGroup 
              options={this.state.passwordOptions} 
              defaultValue={this.state.passwordOptions} 
              onChange={this.handleOptionsChange} 
            />
          </Col>
        </Row>
        <label>Password Strength:</label>
        <Progress 
          percent={this.state.passwordScore} 
          showInfo={false}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  mode: state.recordForm.mode
})

export default connect(mapStateToProps)(PasswordHandler)
