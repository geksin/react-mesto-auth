import React from 'react';
import CloseButtonPopup from './CloseButtonPopup.js';
import iconSuccessPath from './../images/success.svg';
import iconErrorsPath from './../images/errors.svg';



function InfoTooltip (props) {
    React.useEffect(() => {
        function handleEscClose(evt) {
            if (evt.key === "Escape") {
                props.isClose()
        }}
        document.addEventListener('keydown',handleEscClose);

        return () => {
            document.removeEventListener('keydown',handleEscClose);
          };
      },);

      React.useEffect(() => {
        function handleClickOutClose(evt) {
            if (evt.target.classList.contains('popup')) {
                props.isClose()
        }}
        document.addEventListener('click',handleClickOutClose);

        return () => {
            document.removeEventListener('click',handleClickOutClose);
          };
      },);
    return (
        <div className={`popup popup_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <CloseButtonPopup isClose={props.isClose} />
                <div className="popup__info-tooltip">
                    <img className="popup__info-tooltip-image" src={props.status ? iconSuccessPath : iconErrorsPath} alt="статус проверки" />
                    <h2 className="popup__title">{props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Проверьте информацию и попробуйте ёще."}</h2>

                </div>

            </div>
        </div>
    )
}

export default InfoTooltip;
