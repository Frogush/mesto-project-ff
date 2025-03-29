import "../pages/index.css";
import { initialCards } from "../components/cards";
import { createCard, deleteCard, renderCards, likeCard, openPopUpImage } from "../components/card";
import { openPopUp, closePopUp } from "../components/modal";

// @todo: DOM узлы

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

// @todo: Выводит все карточки из массива initialCards файла cards.js
renderCards(initialCards);

// @todo: Функций закрытия popup через крестик для всех popup
popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");
  
    closeButton.addEventListener("click", () => closePopUp(popup));
  
    popup.addEventListener("mousedown", (event) => {
      if (event.target === event.currentTarget) {
        closePopUp(popup);
      }
    });
  
    popup.classList.add("popup_is-animated");
});

// @todo: Функция добавления новой карточки
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

// @todo: Функция редактирования профиля
function addNewProfile(evt) {
    evt.preventDefault();
  
    profileName.textContent = inputName.value;
    profileBio.textContent = inputDescription.value;
  
    closePopUp(popupEditProfile);
  
    formEditProfile.reset();
}

// @todo: Функция заполнения полей профиля перед открытием попапа
function addProfileValues() {
    inputName.value = profileName.textContent;
    inputDescription.value = profileBio.textContent;
}

// @todo: Добавляем обработчики событий для открытия попапов
editProfileButton.addEventListener("click", () => {
    openPopUp(popupEditProfile);
    addProfileValues();
});

addProfileButton.addEventListener("click", () =>
    openPopUp(popupNewCard)
);

// @todo: Добавляем обработчики событий для форм
formEditProfile.addEventListener("submit", addNewProfile);
formNewCard.addEventListener("submit", addNewCard);