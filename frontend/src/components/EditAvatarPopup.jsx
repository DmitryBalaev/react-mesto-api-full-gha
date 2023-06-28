import React from 'react'
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../context/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const currentUser = React.useContext(CurrentUserContext)

  const inputRef = React.useRef({});

  React.useEffect(() => {
    isOpen &&
      (inputRef.current.value = '')
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }
  return (


    <PopupWithForm
      name="update"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_update-user-img_link"
        name="avatar"
        defaultValue={currentUser.avatar}
        placeholder="Ссылка на аватар"
        required=""
        type="url"
        id="user-img-link-input"
        ref={inputRef}
      />
      <span className="popup__input-error" id="user-img-link-input-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
