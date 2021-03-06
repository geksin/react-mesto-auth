import iconEditPath from './../images/edit.svg';
import iconAddPath from './../images/add.svg';
import api from '../utils/api.js';
import React from 'react';
import Card from './Card.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main (props) {
    const currentUser = React.useContext(CurrentUserContext);


     function handleClickApp(card) {
        props.onCardClick(card);
      } 


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                <div className="profile__avatar-hover" >
                    <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}  onClick={props.onEditAvatar} alt="фотография Жак-Ив Кусто" /></div>
                <div className="profile__text">
                    <div className="profile__title"><h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}><img src={iconEditPath} alt="кнопка редактирования" />
                    </button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}><img className="profile__icon-add" src={iconAddPath} title="кнопка добавить" alt="кнопка добавить" />
                </button>
            </section>
            <section className="elements">
                {props.arrayCards.map((item) => <Card key={item._id} card={item} onCardClick={handleClickApp} onCardLike={props.onCardLikeApp} onDeleteCard={props.onDeleteCard} />)}
            </section>
        </main>
    );

}


export default Main;