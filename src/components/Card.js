
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card (props) {
    // console.log(props.card.owner._id);

    const currentUser = React.useContext(CurrentUserContext);
    // console.log(currentUser._id);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
    `element__button-delete ${isOwn ? 'element__button-delete_visible' : 'element__button-delete_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__button-like ${isLiked ? 'button-like_yes' : ''}`; 


    function handleClick() {
        props.onCardClick(props.card);
      } 

    function handleLikeClick() {
      props.onCardLike(props.card);
    } 

    function handleDeleteClick() {
      props.onDeleteCard(props.card);
    } 

    return (
        <div className="card__template">
            <article className="element">
                <img className="element__photo" src={props.card.link} title={`Пользователь ${props.card.owner.name} загрузил фото и назвал ${props.card.name}`} alt={`Пользователь с ником ${props.card.owner.name}, загрузил фото и назвал: ${props.card.name}`} onClick={handleClick} />
                <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
                <div className="element__down-part">
                <h2 className="element__name">{props.card.name}</h2>
                    <div className="element__like">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                          <span className="element__button-like-counter">{props.card.likes.length}</span> 
                    </div>
                </div>
            </article>
        </div>
        );
}

export default Card;
