// === Импорты стилей, компонентов, изображений ===
import "../pages/index.css";
import { createCard, removeCard, toggleLikeCard, updateLikeCard } from "../components/card";
import { openPopUp, closePopUp } from "../components/modal";
import { enableValidation, clearValidation } from '../components/validation.js';
import { getAllCards, getUser, editProfile, editAvatar, addCard, deleteCard, likeCard, unlikeCard } from "../components/api.js";
import logo from "../images/logo.svg";

// === Установка логотипа ===
document.querySelector(".logo").src = logo;

// === DOM: Кнопки и формы ===
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const editProfileAvatarButton = document.querySelector(".profile__image-button");

const formProfile = document.forms['edit-profile'];
const formNewPlace = document.forms['new-place'];
const formAvatar = document.forms['new-avatar'];

// DOM узлы: Все PopUp's 
const popups = document.querySelectorAll(".popup"); 

// === DOM: Карточки и контейнер ===
const cardsContainer = document.querySelector(".places__list");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = popupNewCard.querySelector(".popup__form");
const inputCardName = formNewCard.querySelector(".popup__input_type_card-name");
const inputCardUrl = formNewCard.querySelector(".popup__input_type_card-url");

// === DOM: Профиль пользователя ===
const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const inputName = formEditProfile.querySelector(".popup__input_type_name");
const inputDescription = formEditProfile.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileBio = document.querySelector(".profile__description");

// === DOM: Аватар ===
const popupEditAvatarProfile = document.querySelector(".popup_type_avatar");
const inputAvatarUrl = document.querySelector(".popup__input_type_avatar-url");
const profileAvatar = document.querySelector(".profile__image");

// === DOM: Попап изображения ===
const popupTypeImage = document.querySelector(".popup_type_image");
const popUpImage = popupTypeImage.querySelector(".popup__image");
const popUpCaption = popupTypeImage.querySelector(".popup__caption");

// === ID пользователя ===
let userId = null;

// === Конфигурация валидации ===
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

// === Утилита: Отображение загрузки на кнопке ===
function renderLoading(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранение";
}

// === Работа с карточками ===

// Обработка лайка карточки
function handleLikeCard(cardId, isLiked, likeButton, likeCounter) {
  const likeAction = isLiked ? unlikeCard : likeCard;

  likeAction(cardId)
    .then((updatedCard) => {
      toggleLikeCard(likeButton);
      updateLikeCard(likeCounter, updatedCard.likes);
    })
    .catch((error) => {
      console.log("Ошибка обновления лайка:", error);
    });
}

// Обработка удаления карточки
function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      removeCard(cardElement);
    })
    .catch((error)=> {
      console.log("Ошибка при удалении карточки:", error);
    })
}

// Добавление новой карточки
function handleAddNewCard(evt) {
  evt.preventDefault();

  const cardData = {
    name: inputCardName.value,
    link: inputCardUrl.value,
  };

  renderLoading(true, evt.submitter);

  addCard(cardData.name, cardData.link)
    .then((card) => {
      cardsContainer.prepend(createCard(card, removeCard, handleLikeCard, openPopUpImage, userId));
      setTimeout(() => {
        closePopUp(popupNewCard);
      }, 100);
      formNewCard.reset();
    })
    .catch((error) => {
      console.log("Ошибка добавления карточки:", error);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

// === Работа с профилем ===

// Редактирование профиля
function handleAddNewProfile(evt) {
  evt.preventDefault();

  const name = inputName.value;
  const about = inputDescription.value;

  renderLoading(true, evt.submitter);

  editProfile(name, about)
    .then((res) => {
      profileName.textContent = res.name;
      profileBio.textContent = res.about;
      setTimeout(() => {
        closePopUp(popupEditProfile);
      }, 100);
    })
    .catch((error) => {
      console.log("Ошибка обновления профиля:", error);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

// Заполнение полей профиля перед открытием
function addProfileValues() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileBio.textContent;
}

// === Работа с аватаром ===

// Редактирование аватара
function handleEditAvatar(evt) {
  evt.preventDefault();
  
  const link = inputAvatarUrl.value;
  
  renderLoading(true, evt.submitter);

  editAvatar(link)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      setTimeout(() => {
        closePopUp(popupEditAvatarProfile);
      }, 100);
      formAvatar.reset();
    })
    .catch((error) => {
      console.log("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

// === Работа с попапом изображения ===
function openPopUpImage(link, name) {
  popUpImage.src = link;
  popUpImage.alt = name;
  popUpCaption.textContent = name;
  openPopUp(popupTypeImage);
}

// === Обработчики событий ===

// Открытие попапа профиля
editProfileButton.addEventListener("click", () => {
  addProfileValues();
  clearValidation(formProfile, validationConfig);
  openPopUp(popupEditProfile);
});

// Открытие попапа добавления карточки
addProfileButton.addEventListener("click", () => {
  clearValidation(formNewPlace, validationConfig);
  openPopUp(popupNewCard)
});

// Открытие попапа редактирования аватара
editProfileAvatarButton.addEventListener("click", () => {
  clearValidation(formAvatar, validationConfig);
  openPopUp(popupEditAvatarProfile);
});

// Слушатели отправки форм
formEditProfile.addEventListener("submit", handleAddNewProfile);
formNewCard.addEventListener("submit", handleAddNewCard);
formAvatar.addEventListener("submit", handleEditAvatar);

// Закрытие попапов по крестику и оверлею
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", () => closePopUp(popup));

  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopUp(popup);
    }
  });
});

// === Инициализация данных при загрузке ===
function updateUserData(user) {
  profileName.textContent = user.name;
  profileBio.textContent = user.about;
  profileAvatar.style.backgroundImage = `url(${user.avatar})`;
}

Promise.all([getAllCards(), getUser()])
  .then(([cards, user]) => {
    updateUserData(user);
    userId = user._id;
    cards.forEach((card) => {
      cardsContainer.append(
        createCard(card, handleDeleteCard, handleLikeCard, openPopUpImage, userId)
      );
    });
  })
  .catch((error) => {
    console.log("Ошибка при загрузке данных:", error);
  });