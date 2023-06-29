/* eslint-disable no-unused-expressions */
import React from 'react'
import { CurrentUserContext } from '../context/CurrentUserContext'

function Card({ card, onImageClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwner = card.owner === currentUser._id;
  const isLiked = card.likes.some((user) => user === currentUser._id);
  const likeBtnClassName = `cards__item-btn ${isLiked && 'cards__item-btn_active'}`

  function handleDeleteClick() {
    onCardDelete(card)
  }

  function handleImageClick() {
    onImageClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <li className="cards__item">
        {isOwner && <button className="card__item-trash-btn" onClick={handleDeleteClick}></button>}
        <img src={card.link} alt={card.name} className="cards__item-img" onClick={handleImageClick} />
        <div className="cards__item-description">
          <h2 className="cards__item-title">{card.name}</h2>
          <div className="cards__item-like">
            <button type="button" className={likeBtnClassName} onClick={handleLikeClick}></button>
            <span className="cards__item-like-count">{card.likes.length}</span>
          </div>
        </div>
      </li>
    </CurrentUserContext.Provider>

  )
}

export default Card