import React from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import AddPlacePopup from './AddPlacePopup'
import ConfirmPopup from './ConfirmPopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ImagePopup from './ImagePopup'
import Register from './Register'
import { api } from '../utils/api'
import { CurrentUserContext } from '../context/CurrentUserContext'
import ProtectRouteElement from './ProtectedRoute'
import Login from './Login'
import InfoToolTip from './InfoToolTip'
import * as auth from '../utils/Auth'

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false)
  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [valueRegister, setValueRegister] = React.useState({})
  const [valueLogin, setValueLogin] = React.useState({})
  const [userEmail, setUserEmail] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const navigate = useNavigate()

  function handleRegister() {
    if (valueRegister.email || valueRegister.password) {
      console.log(valueRegister.email)
      auth
        .register(valueRegister)
        .then(() => {
          handleInfoToolTipClick()
          navigate('/sign-in', { replace: true });
          setValueRegister({});
        })
        .catch((err) => {
          handleInfoToolTipError(err)
        })
    }
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    navigate('/sign-in', { replace: true })
  }

  function handleLogin() {
    if (valueLogin.email || valueLogin.password) {
      console.log(valueLogin)
      auth
        .login(valueLogin)
        .then((res) => {
          if (res.token) {
            localStorage.setItem('jwt', res.token)
            navigate('/', { replace: true })
            setLoggedIn(true)
            setUserEmail(valueLogin.email)
            setValueLogin({})
          }
        })
        .catch((err) => {
          handleInfoToolTipError(err)
        })
    }
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt')

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setUserEmail(res.data.email)
            navigate('/', { replace: true })
          }
        })
        .catch((err) => console.log(err))
    }
  }

  React.useEffect(() => {
    checkToken()
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user)
          setCards(cards.data)
        })
        .catch(err => console.log(err))
    }
    
  }, [loggedIn])
  function handleImageClick(card) {
    setSelectedCard(card)
    setImagePopupOpen(true)
  }

  function handleInfoToolTipClick() {
    setInfoToolTipOpen(true)
  }

  function handleInfoToolTipError({ error, message }) {
    setInfoToolTipOpen(true)
    setErrorMessage(message || error);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
    setConfirmPopupOpen(false)
    setInfoToolTipOpen(false)
    setTimeout(() => {
      setSelectedCard({})
    }, 500)
  }

  function handleTrashIconClick(card) {
    setConfirmPopupOpen(true)
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete() {
    api.deleteCard(selectedCard._id)
      .then(() => {
        setTimeout(() => {
          setCards(cards.filter((item) => item._id !== selectedCard._id))
          closeAllPopups()
        }, 500)
      })
      .catch(err => console.log(err))
    setSelectedCard({})
  }

  function handleUpdateUser(value) {
    api.sendUserData(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(value) {
    api.sendAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(value) {
    api.sendNewCard(value)
      .then((res) => {
        setCards([res.data, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          loggedIn={loggedIn}
          email={userEmail}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectRouteElement
                element={Main}
                onCardDelete={handleTrashIconClick}
                onCardLike={handleCardLike}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onImageClick={handleImageClick}
                onTrashIconClick={handleTrashIconClick}
                cards={cards}
                loggedIn={loggedIn}
              />}
          />
          <Route
            path='/sign-up'
            element={
              loggedIn ? (
                <Navigate to='/' replace />
              ) :
                (<Register
                  onSubmit={handleRegister}
                  value={valueRegister}
                  setValue={setValueRegister}
                />)}
          />
          <Route
            path='/sign-in'
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login
                  onSubmit={handleLogin}
                  value={valueLogin}
                  setValue={setValueLogin}
                />)}
          />
        </Routes>
        {loggedIn && <Footer />}
        {loggedIn && <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />}
        {loggedIn && <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />}
        {loggedIn && <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />}
        {loggedIn && <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />}
        {loggedIn && <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />}
        <InfoToolTip
          error={errorMessage}
          name='tool-tip'
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
