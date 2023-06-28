import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../context/CurrentUserContext'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onImageClick, onCardLike, onCardDelete, cards }) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__user">
            <div className="profile__avatar-container">
              <img
                src={currentUser.avatar}
                alt="Аватар пользователя"
                className="profile__avatar"
                onClick={onEditAvatar}
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__user-name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-btn"
                onClick={onEditProfile}
              />
              <p className="profile__profession">{currentUser.about}</p>
            </div>
          </div>
          <button
            type="button"
            className="profile__add-btn"
            onClick={onAddPlace}
          />
        </div>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {
            cards.map((card) => (
              <Card card={card} key={card._id} onImageClick={onImageClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main