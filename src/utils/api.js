
class Api {
  constructor({address, token}) {
  this._address = address; 
  this._token = token; 
  }

  getUserData() {
      return fetch(`${this._address}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
      .then((res) => this._returnServerResponse(res))
  }

  _returnServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  uploadUserAvatar(link) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          avatar: link,
      })
    })
    .then((res) => this._returnServerResponse(res))
}



  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => this._returnServerResponse(res))
  }

  deleteCard (id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
        .then((res) => this._returnServerResponse(res))
  }

  getCardLike(id){
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => this._returnServerResponse(res))
  }

  remoteCardLike(id){
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
          authorization: this._token,
      }
  })
      .then((res) => this._returnServerResponse(res))
  }

  setCardLikes(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
    }
  })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
  }

  editProfile(data) {
    return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            about: data.about
        })
    })
      .then((res) => this._returnServerResponse(res))
  }

  createCard(data) {
    return fetch(`${this._address}/cards`, {
        method: 'POST',
        headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            link: data.link
        })
    })
    .then((res) => this._returnServerResponse(res))
  }

}

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-19',
  token: 'd0d17317-fe5c-4341-9c10-713100a37209'
});

export default api;