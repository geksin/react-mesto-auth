import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles/Login.css';


function Register (props) {

  const [userData, setUserData] = React.useState({email: '',password: ''});

  function handleChange(e) {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }
  

  function handleSubmit(e){
    e.preventDefault();
    if (!userData.email || !userData.password){
      return;
    }
    props.onRegister(userData.email, userData.password);
  }

  return(
        <div className="login">
          <h2 className="login__header">Регистрация</h2>
          <form onSubmit={handleSubmit} className="login__form">
            <input id="email" name="email" type="text" className="login__input" placeholder="Email" minLength={2} maxLength={40} required value={userData.email} onChange={handleChange} />
            <input className="login__input" required id="password" name="password" type="password" placeholder="Пароль" value={userData.password} onChange={handleChange} />
            <div className="login__button-container">
              <button type="submit" className="login__button">Зарегистрироваться</button>
              <Link className="signup__link" href="/login">Уже зарегистрированы? Войти</Link>
            </div>
          </form>
        </div>
      )

}

export default withRouter(Register);

