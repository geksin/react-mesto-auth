import headerLogoPath from './../images/header-logo.svg';

function Header () {
    return (
        <header className="header">
          <a href="##" target="_self"><img className="header__logo" src={headerLogoPath} alt="Логотип Mesto" /></a>
        </header>
        );
}

export default Header;