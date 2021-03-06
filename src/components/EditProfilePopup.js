import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup (props) {

    const [name, setName] = React.useState('Загрузка...');
    const [description, setDescription] = React.useState('Загрузка...');

    const currentUser = React.useContext(CurrentUserContext);

    function handleChangeName(e) {
        setName(e.target.value);
      }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
    }, [currentUser]);


    function handleSubmit(e) {

        e.preventDefault();
        props.onUpdateUser({
          name,
          about: description,
        });
      }


    return (
        <PopupWithForm onSubmit={handleSubmit} name="edit-profile" formName="form_edit" title="Редактировать профиль" isOpen={props.isOpen} isClose={props.onClose}>
        <input id="profile-name" name="profile-name" type="text" className="popup__profile-input" placeholder="Имя" minLength={2} maxLength={40} required value={name} onChange={handleChangeName}/>
        <span id="profile-name-error" className="popup__profile-input-error" />
        <input id="profile-profession" name="profile-profession" type="text" className="popup__profile-input" placeholder="Вид деятельности" minLength={2} maxLength={200} required value={description} onChange={handleChangeDescription} />
        <span id="profile-profession-error" className="popup__profile-input-error" />
        <button type="submit" className="popup__button-save">Сохранить</button>
      </PopupWithForm>
    )
}

export default EditProfilePopup;
