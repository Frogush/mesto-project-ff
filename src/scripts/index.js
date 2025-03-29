import "../pages/index.css";

import { initialCards } from "../components/cards";
import { createCard, deleteCard, likeCard } from "../components/card";
import { openPopUp, closePopUp } from "../components/modal";

import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";

// Устанавливаем правильные пути в HTML
document.querySelector(".logo").src = logo;
document.querySelector(".profile__image").style.backgroundImage = `url(${avatar})`;

// DOM узлы: Кнопки
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");

// DOM узлы: Все PopUp's 
const popups = document.querySelectorAll(".popup"); 

// DOM узлы: Для карточек
const cardsContainer = document.querySelector(".places__list");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = popupNewCard.querySelector(".popup__form");
const inputCardName = formNewCard.querySelector(".popup__input_type_card-name");
const inputCardUrl = formNewCard.querySelector(".popup__input_type_url");

// DOM узлы: Для редактирования профиля
const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const inputName = formEditProfile.querySelector(".popup__input_type_name");
const inputDescription = formEditProfile.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileBio = document.querySelector(".profile__description");

// DOM узлы: Попап изображения
const popupTypeImage = document.querySelector(".popup_type_image");
const popUpImage = popupTypeImage.querySelector(".popup__image");
const popUpCaption = popupTypeImage.querySelector(".popup__caption");

// Вывод всех карточек из массива initialCards
function renderCards(cards) {
  cards.forEach((card) => {
    cardsContainer.append(createCard(card.name, card.link, deleteCard, likeCard, openPopUpImage));
  });
}

renderCards(initialCards);

// Функция добавления новой карточки
function addNewCard(evt) {
  evt.preventDefault();

  const cardData = {
    name: inputCardName.value,
    link: inputCardUrl.value,
  };

  const card = createCard(cardData.name, cardData.link, deleteCard, likeCard, openPopUpImage);

  cardsContainer.prepend(card);
  closePopUp(popupNewCard);

  formNewCard.reset();
}

// Функция редактирования профиля
function addNewProfile(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileBio.textContent = inputDescription.value;

  closePopUp(popupEditProfile);
}

// Функция заполнения полей профиля перед открытием попапа
function addProfileValues() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileBio.textContent;
}

// Функция открытия попапа с изображением
function openPopUpImage(link, name) {
  popUpImage.src = link;
  popUpImage.alt = name;
  popUpCaption.textContent = name;
  openPopUp(popupTypeImage);
}

// Добавляем обработчики событий для открытия попапов
editProfileButton.addEventListener("click", () => {
  openPopUp(popupEditProfile);
  addProfileValues();
});

addProfileButton.addEventListener("click", () => openPopUp(popupNewCard));

// Добавляем обработчики событий для форм
formEditProfile.addEventListener("submit", addNewProfile);
formNewCard.addEventListener("submit", addNewCard);

// Обработчики закрытия попапов через крестик и оверлей
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", () => closePopUp(popup));

  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopUp(popup);
    }
  });
});
