const url = "https://mesto.nomoreparties.co/v1/wff-cohort-35";
const token = "ebdf6473-eefa-4fdb-a47c-68f2c2046815";
const headers = {
  config: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

const checkServerResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

// Загрузка информации о пользователе с сервера
export const getUser = () => {
    return fetch(url + "/users/me", {
        method: "GET",
        headers: headers.config,
    })
    .then(checkServerResponse);
};

// Загрузка карточек с сервера
export const getAllCards = () => {
    return fetch(url + "/cards", {
        methon: "GET",
        headers: headers.config,
    })
    .then(checkServerResponse);
};

// Редактирование профиля
export const editProfile = (name, about) => {
    return fetch(url + "/users/me", {
        method: "PATCH",
        headers: headers.config,
        body: JSON.stringify({
            name: name,
            about: about,
        }),
    })
    .then(checkServerResponse);
};

// Добавление карточки
export const addCard = (name, link) => {
    return fetch(url + "/cards", {
        method: "POST",
        headers: headers.config,
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    })
    .then(checkServerResponse);
};

// Удаление карточки
export const deleteCard = (cardId) => {
    return fetch(url + "/cards/" + cardId, {
        method: "DELETE",
        headers: headers.config,
    })
    .then(checkServerResponse); 
};

// Передача постановки лайка на сервер
export const likeCard = (cardId) => {
    return fetch(url + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: headers.config,
    })
    .then(checkServerResponse); 
  };

// Передача снятия лайка на сервер
export const unlikeCard = (cardId) => {
    return fetch(url + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: headers.config,
    })
    .then(checkServerResponse); 
  };

// Редактирование аватара
export const editAvatar = (link) => {
    return fetch(url + "/users/me/avatar", {
      method: "PATCH",
      headers: headers.config,
      body: JSON.stringify({
        avatar: link,
      }),
    })
    .then(checkServerResponse); 
};