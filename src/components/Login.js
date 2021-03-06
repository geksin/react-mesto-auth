import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import './styles/Login.css';
import InfoTooltip from './InfoTooltip.js'


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      popup: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToolTipPopup = this.handleToolTipPopup.bind(this);
  }

    handleToolTipPopup() {
        this.setState({
            popup: !this.state.popup
          });
    }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.state.email || !this.state.password){
      return;
    }
    auth.login(this.state.email, this.state.password)
    .then((data) => {
            this.setState({email: '', password: ''} ,() => {
            this.props.handleLogin(data);
            this.props.history.push('/');
            })
        }
      )
    .catch(err => {
        console.log(err);
        this.handleToolTipPopup();
    });
  }


  render(){
    return(
      <div className="login">
        <h2 className="login__header">
          Вход
        </h2>
        <form onSubmit={this.handleSubmit} className="login__form">
         <input id="email" name="email" type="text" className="login__input" placeholder="Email" minLength={2} maxLength={40} required value={this.state.email} onChange={this.handleChange} />
          <input className="login__input" required id="password" name="password" type="password" placeholder="Пароль" value={this.state.password} onChange={this.handleChange} />
          <div className="login__button-container">
            <button type="submit" onSubmit={this.handleSubmit} className="login__button">Войти</button>
          </div>
        </form>
        <InfoTooltip status={false} isOpen={this.state.popup} isClose={this.handleToolTipPopup}  />
      </div>
    )
  }
}

export default withRouter(Login);

