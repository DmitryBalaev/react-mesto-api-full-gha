import apiObj from './utils'

class Api {
	constructor(optionObj) {
		this._url = optionObj.url
		this._headers = optionObj.headers
	}

	getInitialCards() {
		return fetch(`${this._url}cards`, {
			headers: this._headers
		})
			.then(this._handleResponse)
	}

	_handleResponse(res) {
		return res.ok ? res.json() : Promise.reject(res.status)
	}

	getUserInfo() {
		return fetch(`${this._url}users/me`, {
			headers: this._headers
		})
			.then(this._handleResponse)
	}

	sendAvatar(link) {
		return fetch(`${this._url}users/me/avatar`, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify(link)
		})
			.then(this._handleResponse)
	}

	sendUserData(data) {
		return fetch(`${this._url}users/me`, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify(data)
		})
			.then(this._handleResponse)
	}

	sendNewCard(data) {
		return fetch(`${this._url}cards`, {
			headers: this._headers,
			method: 'POST',
			body: JSON.stringify(data)
		})
			.then(this._handleResponse)
	}

	deleteCard(id) {
		return fetch(`${this._url}cards/${id}`, {
			headers: this._headers,
			method: 'DELETE'
		})
			.then(this._handleResponse)
	}

	changeLikeCardStatus(id, isLiked) {
		if (!isLiked) {
			return fetch(`${this._url}cards/${id}/likes`, {
				headers: this._headers,
				method: 'PUT'
			})
				.then(this._handleResponse)
		} else {
			return fetch(`${this._url}cards/${id}/likes`, {
				headers: this._headers,
				method: 'DELETE'
			})
				.then(this._handleResponse)
		}
	}

}

export const api = new Api(apiObj)
