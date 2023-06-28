import React from 'react'

function PopupWithForm({ name, isOpen, title, btnText, onClose, children, onSubmit }) {

  const className = `popup popup-${name} ${isOpen ? 'popup_opened' : ''}`

  return (
    <div className={className}>
      <div className="popup__overlay" onClick={onClose} />
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__btn-submit" type="submit">
            {btnText}
          </button>
        </form>
        <button
          className="popup__btn-close"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default PopupWithForm;