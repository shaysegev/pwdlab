import React from 'react'
import SignUpForm from './SignUpForm'

const Hero = () => (
  <div className="hero">
    <div className="container">
      <div className="hero">
        <h2 className="hero__title">Secure your passwords.</h2>
        <h3 className="hero__subtitle">Access anywhere. Anytime.</h3>
        <div className="hero__form">
          <SignUpForm className="hero__signup" />
        </div>
      </div>
    </div>
  </div>
)

export default Hero