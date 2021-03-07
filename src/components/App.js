import './../index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import api from '../utils/api.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip'
import Register from './Register.js';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';


import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  
  const [currentUser, setCurrentUser] = React.useState({});

  
  React.useEffect(() => {
    api.getUserData()
    .then((values)=>{
      setCurrentUser(values);
    })
    .catch((err)=>{     
        console.log(err);
     })
  },[]);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((values) => setCards(values))
      .catch((err)=>{     
        console.log(err);
        })
  },[]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const likeRequest = !isLiked ? api.setCardLikes(card._id) : api.remoteCardLike(card._id);
    likeRequest
        .then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        })
        .catch((err)=>{     
            console.log(err);
            })
}

function handleCardDelete(card) {
  api.deleteCard(card._id)
      .then((res) => {
          const newCards = cards.filter((c) => c._id !== card._id);
          setCards(newCards);
      })
      .catch((err)=>{     
          console.log(err);
          })
}


  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  function handleEditAvatarClick(){
    setEditAvatarPopup(true)
  }

  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  function handleEditProfileClick(){
    setEditProfilePopup(true)
  }

  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  function handleAddPlaceClick(){
    setAddPlacePopup(true)
  }

  const [isDeleteCardPopupOpen, setDeleteCardPopup] = React.useState(false);
  // function handleDeleteCardPopup(){
  //   setDeleteCardPopup(true)
  // }

  function closeAllPopup() {
    setAddPlacePopup(false);
    setEditProfilePopup(false);
    setEditAvatarPopup(false);
    setDeleteCardPopup(false);
    setIsOpen(false);
    setPopupToolTip(false);
    setTimeout(() => setPopupToolTipStatus(false), 1000);
  }


  const [selectedCard, setSelectedCard] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  function handleCardClick(card){
    setSelectedCard(card);
    setIsOpen(true);
  }

    function handleUpdateUser(data) {
      api.editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err)=>{     
          console.log(err);
          })
    }

    function handleUpdateAvatar(link) {
      api.uploadUserAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err)=>{     
          console.log(err);
          })
    }

    function handleAddPlaceSubmit(data) {
      api.createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err)=>{     
          console.log(err);
          })
    }

    // авторизация

    const [popupToolTip, setPopupToolTip] = React.useState(false);
    function handlePopupToolTip(){
      setPopupToolTip(true)
    }

    const [popupToolTipStatus, setPopupToolTipStatus] = React.useState(false);
    function handlePopupToolTipSucsess () {
      setPopupToolTip(true);
      setPopupToolTipStatus(true);
    }

    const history = useHistory();

    const [loggedIn, setLoggedIn] = React.useState(false);

    const [email, setEmail] = React.useState('');

    function handleLogin(token){
      setLoggedIn(true);
      tokenCheck();
    }

    function tokenCheck() {
          const token = localStorage.getItem('token');
        if (token) {
          auth.checkToken(token).then((res) => {
            if (res){
              setLoggedIn(true);
              setEmail(res.data.email);
              history.push("/");
            }
          }); 
        }
      }

    React.useEffect(() => {
      tokenCheck();
    }, []);


    function handleSignOut() {
      localStorage.removeItem('token');
      setLoggedIn(false);
      history.push('/login')
    }

    function authLogin(email, password) {
      auth.login(email, password)
      .then((data) => {
            handleLogin(data);
            history.push('/');
        }
      )
    .catch(err => {
        console.log(err);
        handlePopupToolTip();
    });
    }

    function authRegister(email, password) {
      auth.register(email, password)
      .then((data) => {
            handlePopupToolTipSucsess();
            history.push('/login');
        }
      )
    .catch(err => {
        console.log(err);
        handlePopupToolTip();
    });
    }



  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <Header singOut={handleSignOut} email={email} />
      <Switch>
       <ProtectedRoute exact path="/" component={Main} loggedIn={loggedIn} arrayCards={cards} onEditProfile={handleEditProfileClick} onDeleteCard={handleCardDelete} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLikeApp={handleCardLike} />
        <Route path="/login">
              <Login onLogin={authLogin} />
        </Route>
        <Route path="/register">
              <Register onRegister={authRegister}/>
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
        </Route>
        </Switch>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopup} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopup} onAddPlace={handleAddPlaceSubmit} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopup} onUpdateAvatar={handleUpdateAvatar} /> 
      <PopupWithForm name="delete-card" formName="delete-card" title="Вы уверены?" isOpen={isDeleteCardPopupOpen} isClose={closeAllPopup}>
        <button type="button" className="popup__button-save">Уверен на все 100%</button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopup} isOpen={isOpen}/>
      <Footer />
      <InfoTooltip status={popupToolTipStatus} isOpen={popupToolTip} isClose={closeAllPopup}  />
    </CurrentUserContext.Provider>
  </>  

  );
}

export default withRouter(App);
