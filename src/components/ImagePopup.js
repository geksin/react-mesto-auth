import React from 'react';
import CloseButtonPopup from './CloseButtonPopup.js';


function ImagePopup(props) {

    React.useEffect(() => {
        function handleEscClose(evt) {
            if (evt.key === "Escape") {
                props.onClose()
        }}
        document.addEventListener('keydown',handleEscClose);

        return () => {
            document.removeEventListener('keydown',handleEscClose);
          };
      },);

      React.useEffect(() => {
        function handleClickOutClose(evt) {
            if (evt.target.classList.contains('popup')) {
                props.onClose()
        }}
        document.addEventListener('click',handleClickOutClose);

        return () => {
            document.removeEventListener('click',handleClickOutClose);
          };
      },);

    return (
        <div className={`popup popup_image ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container-image">
                <CloseButtonPopup isClose={props.onClose} />
                    <img className="popup__img" src={props.card.link} title={props.card.name} alt={props.card.name} />
                     <p className="popup__signature">{props.card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;