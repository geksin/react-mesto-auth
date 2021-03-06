

const BASE_URL = 'https://auth.nomoreparties.co';


export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)) 
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)) 
  .then((data) => {
      localStorage.setItem('token', data.token);
      return data;
  })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)) 
}



// функция register - принимает почту и пароль, отправляет запрос регистрации на /signup
// функция login - принимает почту и пароль, отправляет запрос авторизации на /signin . В ответ сервер вернет jwt, который нужно сохранить в localStorage
// функция checkToken - принимает jwt, отправляет запрос на /users/me и возвращает данные пользователя