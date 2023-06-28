import React from "react";
import { Link } from 'react-router-dom'

export default function Register({onSubmit, value, setValue}) {

  function handleChange (e) {
    setValue({...value, [e.target.name]: e.target.value})
  }

  function handleSubmit (e) {
    e.preventDefault()
    onSubmit()
  }
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} name="register" className="auth__form">
        <input onChange={handleChange} type="email" name="email" className="auth__input" placeholder="Email" value={value.email ?? ''}/>
        <input onChange={handleChange} type="password" name="password" className="auth__input" placeholder="Пароль" value={value.password ?? ''}/>
        <button type="submit" className="auth__button" >Зарегистрироваться</button>
      </form>
      <p className="auth__description">Уже зарегистрированы?&nbsp;<Link to='/sign-in' className="auth__link">Войти</Link></p>
    </div>
  )
}