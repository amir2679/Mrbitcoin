import { Component } from 'react'

import { userService } from '../services/user.service'

export class LoginSignupPage extends Component {

  state = {
    // isSignUp: true,
    user: {}
  }

  onSignup = (ev) => {
    const user = userService.signup(this.state.user.name)
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break;
      case 'checkbox':
        value = target.checked
        break
      case 'text':
        value = value.trim()
        break
      default:
        break
    }

    this.setState(prevState => ({ user: { ...prevState.user, [field]: value } }))
  }

  render() {
    return (
      <section className='login-signup'>

        <section className="login">

        </section>

        <section className="sign-up">
          <input className="c-checkbox" type="checkbox" id="start" />
          {/* <input className="c-checkbox" type="checkbox" id="progress2" />
          <input className="c-checkbox" type="checkbox" id="progress3" /> */}
          <input className="c-checkbox" type="checkbox" id="finish" onChange={this.onSignup} />
          <div className="c-form__progress"></div>
          <div className="c-formContainer">
            <div className="c-welcome">
              <pre>
                Welcome aboard!

                Get reacher by the minute...
              <span onClick={() => this.props.history.push('/')}>Continue</span>
              </pre>
              <div className="firework"></div>
              <div className="firework"></div>
              <div className="firework"></div>
            </div>
            <form className="c-form" action="">
              <div className="c-form__group">
                <label className="c-form__label" htmlFor="username">
                  <input
                    type="text"
                    id="username"
                    className="c-form__input"
                    placeholder=" "
                    pattern="[^\s]+"
                    required
                    name="name"
                    onChange={this.handleChange}
                  />
                  <label className="c-form__next" htmlFor="finish" role="button">
                    <span className="c-form__nextIcon"></span>
                  </label>
                  <span className="c-form__groupLabel">Create your username.</span>
                  <b className="c-form__border"></b>
                </label>
              </div>
              {/* <div className="c-form__group">
                <label className="c-form__label" htmlFor="femail">
                  <input
                    type="email"
                    id="femail"
                    className="c-form__input"
                    placeholder=" "
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                    required />
                  <label className="c-form__next" htmlFor="progress3" role="button">
                    <span className="c-form__nextIcon"></span>
                  </label>
                  <span className="c-form__groupLabel">What's your email?</span>
                  <b className="c-form__border"></b>
                </label>
              </div>
              <div className="c-form__group">
                <label className="c-form__label" htmlFor="fpass">
                  <input
                    type="password"
                    id="fpass"
                    className="c-form__input"
                    placeholder=" "
                    required />
                  <label className="c-form__next" htmlFor="finish" role="button">
                    <span className="c-form__nextIcon"></span>
                  </label>
                  <span className="c-form__groupLabel">Create your password.</span>
                  <b className="c-form__border"></b>
                </label>
              </div> */}
              <label className="c-form__toggle" htmlFor="start">Sign up<span className="c-form__toggleIcon"></span></label>
            </form>
          </div>
        </section>
      </section>
    )
  }
}
