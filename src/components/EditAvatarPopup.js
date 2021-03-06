import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

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

    //     <PopupWithForm onSubmit={handleSubmit} name="edit-profile" formName="form_edit" title="Редактировать профиль" isOpen={props.isOpen} isClose={props.onClose}>
    //     <input id="profile-name" name="profile-name" type="text" className="popup__profile-input" placeholder="Имя" minLength={2} maxLength={40} required value={name} onChange={handleChangeName}/>
    //     <span id="profile-name-error" className="popup__profile-input-error" />
    //     <input id="profile-profession" name="profile-profession" type="text" className="popup__profile-input" placeholder="Вид деятельности" minLength={2} maxLength={200} required value={description} onChange={handleChangeDescription} />
    //     <span id="profile-profession-error" className="popup__profile-input-error" />
    //     <button type="submit" className="popup__button-save">Сохранить</button>
    //   </PopupWithForm>
    )
}

export default EditAvatarPopup;
