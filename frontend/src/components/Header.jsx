import logo from '../images/svg/logo.svg';
import React from 'react';
import { Link, useLocation } from 'react-router-dom'

function Header({ loggedIn, email, handleLogout}) {
  const location = useLocation()

  const path = location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'
  const linkName = location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'

  return (
    <>
      <header className="header">
        <Link to={'/'}>
          <img
          src={logo}
          alt="Логотип проекта Место"
          className="header__logo"
        />
        </Link>
      <div className="header__buttons-wrapper">
        {
          loggedIn
            ? (
              <>
                <p className='header__email'>{email}</p>
                <button className='header__btn' onClick={handleLogout}>Выйти</button>
              </>
            )
            : (
              <>
                <Link to={path} className='header__link'>{linkName}</Link>
              </>
            )
        }

      </div>
    </header>
    </>
  )
}

export default Header