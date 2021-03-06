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


  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main arrayCards={cards} onEditProfile={handleEditProfileClick} onDeleteCard={handleCardDelete} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLikeApp={handleCardLike} />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopup} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopup} onAddPlace={handleAddPlaceSubmit} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopup} onUpdateAvatar={handleUpdateAvatar} /> 

      <PopupWithForm name="delete-card" formName="delete-card" title="Вы уверены?" isOpen={isDeleteCardPopupOpen} isClose={closeAllPopup}>
        <button type="button" className="popup__button-save">Уверен на все 100%</button>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopup} isOpen={isOpen}/>
      <Footer />
    </CurrentUserContext.Provider>
  </>  

  );
}

export default App;
