import { Link, Route } from 'react-router-dom';
import headerLogoPath from './../images/header-logo.svg';

function Header (props) {

  function handleSignOut() {
    props.singOut();
  }

    return (
        <header className="header">
          <a href="/" target="_self"><img className="header__logo" src={headerLogoPath} alt="Логотип Mesto" /></a>
          <div className="login__signup">
          <Route path="/login">
            <Link to="/register" className="signup__link">Регистрация</Link> 
          </Route>
          <Route path="/register">
            <Link to="/login" className="signup__link">Войти</Link> 
          </Route>
          <Route exact path="/">
            <p>{props.email} <a onClick={handleSignOut} href="#" className="login__sing-out">Выйти</a></p>
          </Route>
          </div>
        </header>
        );
}

export default Header;