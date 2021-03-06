import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup (props) {

    const inputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(inputRef.current.value);
      }

    return (

        <PopupWithForm onSubmit={handleSubmit} name="upload-avatar" formName="form-avatar" title="Обновить аватар" isOpen={props.isOpen} isClose={props.onClose}>
        <input id="ava-link" name="card-link" type="url" className="popup__profile-input" placeholder="Ссылка на картинку" ref={inputRef} required />
        <span id="ava-link-error" className="popup__profile-input-error" />
        <button type="submit" className="popup__button-save">Сохранить</button>
        </PopupWithForm>

    )
}

export default EditAvatarPopup;
