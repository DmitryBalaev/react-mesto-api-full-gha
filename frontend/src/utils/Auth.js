const BASE_URL = 'https://api.mesto.dmitrybalaev.nomoreparties.sbs'

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(res.json().then(res => res))
}

export async function register({ email, password }) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  return handleResponse(res)
}

export async function login({ email, password }) {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  })
  console.log(res)
  return handleResponse(res)
}

export async function checkToken(token) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  return handleResponse(res)
}