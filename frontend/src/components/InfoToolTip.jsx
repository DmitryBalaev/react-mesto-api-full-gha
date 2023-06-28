/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import IconOk from '../images/svg/ok.svg'
import IconErr from '../images/svg/err.svg'

function InfoToolTip({ name, isOpen, onClose, error}) {

    const className = `popup popup-${name} ${isOpen ? 'popup_opened' : ''}`
  
    return (
      <div className={className}>
        <div className="popup__overlay" onClick={onClose} />
        <div className="popup__container popup__container_type_tool-tip">
            <img 
                src={error ? IconErr : IconOk}
                alt='icon'
                className="popup__tool-icon"
            />
            <h2 className="popup__title popup__title_type_tool-tip">{error ? `${error}` : 'Вы успешно зарегистрировались!'}</h2>
          <button
            className="popup__btn-close"
            type="button"
            onClick={onClose}
          />
        </div>
      </div>
    )
  }
  
  export default InfoToolTip;