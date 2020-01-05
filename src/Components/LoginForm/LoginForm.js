import React, { Component } from "react";
import "./LoginForm.css";
import AuthService from "../../Service/AuthService";
import TokenService from "../../Service/TokenService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoggedContext from '../../Contexts/LoggedContext';

class LoginForm extends Component {
  // Initializing state of LoginForm Component
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      incorrectUsername: false,
      incorrectPassword: false,
      error: null
    };
  }

  static contextType = LoggedContext

  static defaultProps = {
    onLoginSuccess: () => {}
  };

  handleLogin = e => {
    e.preventDefault();

    const { username, password } = e.target;

    this.setState({
      error: null,
      incorrectPassword: false,
      incorrectUsername: false,
    });

    AuthService.postLogin({
      username: username.value,
      password: password.value
    }).then(res => {
      if (res.message === "Incorrect Username") {
        this.setState({
          incorrectUsername: true,
          error: res.message
        });
        username.value = '';
        password.value = '';
        username.focus();
      }
      if(res.message === 'Incorrect Password'){
        this.setState({
          incorrectPassword: true,
          error: res.message
        })
        password.value = '';
        password.focus();
      }

      if(!this.state.incorrectPassword && !this.state.incorrectUsername){
        TokenService.saveAuthToken(res.authToken);
        this.context.setUserType(res.userType, res.userTypeId);
        this.props.onLoginSuccess();
        username.value = '';
        password.value = ''
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  render() {
    return (
      <form
        className="LoginForm"
        onSubmit={e => {
          this.handleLogin(e);
        }}
      >
        <fieldset>
          <legend>
            <h3>LOGIN</h3>
          </legend>
          <div className="flex">
            <label htmlFor="username">
              <span className="input-title">* Username:</span>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={this.state.username}
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}
              />
              {
                this.state.incorrectUsername &&
                  <ErrorMessage message={this.state.error} />
              }
            </label>
            <label htmlFor="password">
              <span className="input-title">* Password:</span>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                value={this.state.password}
                onChange={(e)=>{
                  this.setState({password: e.target.value})
                }}
              />
              {
                this.state.incorrectPassword &&
                  <ErrorMessage message={this.state.error} />
              }
            </label>
            <button className="btn btn-light" type="submit">
              Login
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default LoginForm;
