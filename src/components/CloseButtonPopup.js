import iconClosePath from './../images/close_icon.svg';
import React from 'react';

function CloseButtonPopup (props) {
    return (
            <button type="button" className="popup__button-close" onClick={props.isClose}>
                <img className="popup__button-close-image" src={iconClosePath} alt="кнопка закрыть" />
            </button>
    )
}

export default CloseButtonPopup;
