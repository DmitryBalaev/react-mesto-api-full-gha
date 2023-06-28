function ImagePopup({ isOpen, card, onClose }) {
  return (
    <>
      <div className={`popup ${isOpen ? 'popup_opened' : ''} popup-image full-screen`}>
        <div className="popup__overlay" onClick={onClose} />
        <div className="full-screen__container">
          <img src={card.link} alt={card.name} className="full-screen__image" />
          <button type="button" className="popup__btn-close" onClick={onClose} />
          <p className="full-screen__descriptions">{card.name}</p>
        </div>
      </div>
    </>
  )
}

export default ImagePopup;