import React from 'react'
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext)

  const [value, setValue] = React.useState({})

  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(value);
  }


  React.useEffect(() => {
    setValue({
      name: currentUser.name,
      about: currentUser.about
    })
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_user_name"
        name="name"
        type="text"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required=""
        id="name-input"
        value={value.name ?? ''}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="name-input-error" />
      <input
        className="popup__input popup__input_user_profession"
        name="about"
        type="text"
        placeholder="Вид деятельности"
        required=""
        minLength={2}
        maxLength={200}
        id="profession-input"
        value={value.about ?? ''}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="profession-input-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;