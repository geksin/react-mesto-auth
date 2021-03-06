import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup (props) {

    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    function handleChangeCardName(e) {
        setCardName(e.target.value);
      }

    function handleChangeCardLink(e) {
        setCardLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
          name: cardName,
          link: cardLink,
        });
      }


    return (
    <PopupWithForm onSubmit={handleSubmit} name="add-card" formName="form_add" title="Новое место" isOpen={props.isOpen} isClose={props.onClose}>
        <input value={cardName} onChange={handleChangeCardName} id="card-name" name="card-name" type="text" className="popup__profile-input" placeholder="Название" minLength={2} maxLength={30} required />
        <span id="card-name-error" className="popup__profile-input-error" />
        <input value={cardLink} onChange={handleChangeCardLink} id="card-link" name="card-link" type="url" className="popup__profile-input" placeholder="Ссылка на картинку" required />
        <span id="card-link-error" className="popup__profile-input-error" />
        <button type="submit" className="popup__button-save">Сохранить</button>
    </PopupWithForm>
    )
}

export default AddPlacePopup;
