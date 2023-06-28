import React from 'react'
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [value, setValue] = React.useState({});

  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(value);
  }

  React.useEffect(() => {
    setValue({})
  }, [isOpen])


  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      btnText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_new-card_name"
        name="name"
        type="text"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
        id="card-name-input"
        onChange={handleChange}
        value={value.name ?? ''}
      />
      <span className="popup__input-error" id="card-name-input-error" />
      <input
        className="popup__input popup__input_new-card_link"
        name="link"
        placeholder="Ссылка на картинку"
        required=""
        type="url"
        id="card-link-input"
        onChange={handleChange}
        value={value.link ?? ''}
      />
      <span className="popup__input-error" id="card-link-input-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
