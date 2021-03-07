import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles/Login.css';



function Login(props) {
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
    props.onLogin(userData.email, userData.password);
  }

  return(
          <div className="login">
        <h2 className="login__header">
          Вход
        </h2>
        <form onSubmit={handleSubmit} className="login__form">
         <input id="email" name="email" type="text" className="login__input" placeholder="Email" minLength={2} maxLength={40} required value={userData.email} onChange={handleChange} />
          <input className="login__input" required id="password" name="password" type="password" placeholder="Пароль" value={userData.password} onChange={handleChange} />
          <div className="login__button-container">
            <button type="submit" onSubmit={handleSubmit} className="login__button">Войти</button>
          </div>
        </form>
      </div>
    )

}



// class Login extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     const {name, value} = e.target;
//     this.setState({
//       [name]: value
//     });
//   }

//   handleSubmit(e){
//     e.preventDefault();
//     if (!this.state.email || !this.state.password){
//       return;
//     }
//     this.props.onLogin(this.state.email, this.state.password);
//   }


//   render(){
//     return(
//       <div className="login">
//         <h2 className="login__header">
//           Вход
//         </h2>
//         <form onSubmit={this.handleSubmit} className="login__form">
//          <input id="email" name="email" type="text" className="login__input" placeholder="Email" minLength={2} maxLength={40} required value={this.state.email} onChange={this.handleChange} />
//           <input className="login__input" required id="password" name="password" type="password" placeholder="Пароль" value={this.state.password} onChange={this.handleChange} />
//           <div className="login__button-container">
//             <button type="submit" onSubmit={this.handleSubmit} className="login__button">Войти</button>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }

export default withRouter(Login);

