import apiObj from './utils'

class Api {
	constructor(optionObj) {
		this._url = 'https://api.mesto.dmitrybalaev.nomoreparties.sbs/'
		this._headers = optionObj.headers
	}

	getInitialCards() {
		return fetch(`${this._url}cards`, {
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
				Accept: "*/*"
			}
		})
			.then(this._handleResponse)
	}

	_handleResponse(res) {
		return res.ok ? res.json() : Promise.reject(res.status)
	}

	getUserInfo() {
		return fetch(`${this._url}users/me`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
				Accept: "*/*"
			}
		})
			.then(this._handleResponse)
	}

	sendAvatar(link) {
		return fetch(`${this._url}users/me/avatar`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
			method: 'PATCH',
			body: JSON.stringify(link)
		})
			.then(this._handleResponse)
	}

	sendUserData(data) {
		return fetch(`${this._url}users/me`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
			method: 'PATCH',
			body: JSON.stringify(data)
		})
			.then(this._handleResponse)
	}

	sendNewCard(data) {
		return fetch(`${this._url}cards`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
			method: 'POST',
			body: JSON.stringify(data)
		})
			.then(this._handleResponse)
	}

	deleteCard(id) {
		return fetch(`${this._url}cards/${id}`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
			method: 'DELETE'
		})
			.then(this._handleResponse)
	}

	changeLikeCardStatus(id, isLiked) {
		if (!isLiked) {
			return fetch(`${this._url}cards/${id}/likes`, {
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				method: 'PUT'
			})
				.then(this._handleResponse)
		} else {
			return fetch(`${this._url}cards/${id}/likes`, {
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				method: 'DELETE'
			})
				.then(this._handleResponse)
		}
	}

}

export const api = new Api(apiObj)
