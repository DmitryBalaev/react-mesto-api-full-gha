import React from "react";

export default function Login({onSubmit, value, setValue}) {
  
  function handleChange (e) {
    setValue({...value, [e.target.name]: e.target.value})
  }

  function handleSubmit (e) {
    e.preventDefault()
    onSubmit()
  }
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={handleSubmit} name="login" className="auth__form">
        <input onChange={handleChange} type="email" name="email" className="auth__input" placeholder="Email" value={value.email ?? ''}/>
        <input onChange={handleChange} type="password" name="password" className="auth__input" placeholder="Пароль" value={value.password ?? ''}/>
        <button type="submit" className="auth__button">Войти</button>
      </form>
    </div>
  )
}