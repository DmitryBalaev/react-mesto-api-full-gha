import apiObj from './utils'

class Api {
	constructor(optionObj) {
		this._url = 'https://api.mesto.dmitrybalaev.nomoreparties.sbs/'
		this._headers = optionObj.headers
	}
	_handleResponse(res) {
		return res.ok ? res.json() : res.text().then((text) => {
		  throw JSON.parse(text).message || JSON.parse(text).error;
		})
	  }

	getInitialCards() {
		return fetch(`${this._url}cards`, {
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
				Accept: "*/*",
				credentials: "include"
			}
		}).then((res) => this._handleResponse(res))
	}


	getUserInfo() {
		return fetch(`${this._url}users/me`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
				Accept: "*/*",
			}
		}).then((res) => this._handleResponse(res))
	}

	sendAvatar(link) {
		return fetch(`${this._url}users/me/avatar`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
				credentials: "include"
			},
			method: 'PATCH',
			body: JSON.stringify(link)
		}).then((res) => this._handleResponse(res))
	}

	sendUserData(data) {
		return fetch(`${this._url}users/me`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
				credentials: "include"
			},
			method: 'PATCH',
			body: JSON.stringify(data)
		}).then((res) => this._handleResponse(res))
	}

	sendNewCard(data) {
		return fetch(`${this._url}cards`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
				credentials: "include"
			},
			method: 'POST',
			body: JSON.stringify(data)
		}).then((res) => this._handleResponse(res))
	}

	deleteCard(id) {
		return fetch(`${this._url}cards/${id}`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("jwt")}`,
				credentials: "include"
			},
			method: 'DELETE'
		}).then((res) => this._handleResponse(res))
	}

	changeLikeCardStatus(id, isLiked) {
		if (!isLiked) {
			return fetch(`${this._url}cards/${id}/likes`, {
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				method: 'PUT'
			}).then((res) => this._handleResponse(res))
		} else {
			return fetch(`${this._url}cards/${id}/likes`, {
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				method: 'DELETE'
			}).then((res) => this._handleResponse(res))
		}
	}

}

export const api = new Api(apiObj)
