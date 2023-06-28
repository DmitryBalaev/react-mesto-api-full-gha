import React from 'react'
import PopupWithForm from './PopupWithForm'

function ConfirmPopup({isOpen, onClose, onSubmit}) {


  function handleDeleteSubmit (evt) {
    evt.preventDefault()
    onSubmit()
  }

  return (
    <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          btnText="Да"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleDeleteSubmit}
      />
     
  )
}

export default ConfirmPopup;