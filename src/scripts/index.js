import "../pages/index.css";
import { initialCards } from "../components/cards";
import { createCard, deleteCard, renderCards, likeCard, openPopUpImage } from "../components/card";
import { openPopUp, closePopUp } from "../components/modal";

// @todo: DOM узлы

// DOM узлы: Кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// DOM узлы: Все PopUp's
const popUps = document.querySelectorAll(".popup");

// DOM узлы: Для карточек
const cardsContainer = document.querySelector(".places__list");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const formElementTypeNewCard = popupTypeNewCard.querySelector(".popup__form");
const namePlace = formElementTypeNewCard.querySelector(".popup__input_type_card-name");
const urlCardImage = formElementTypeNewCard.querySelector(".popup__input_type_url");

// DOM узлы: Для редактирования профиля
const popupTypeEdit = document.querySelector(".popup_type_edit");
const formElementTypeEdit = popupTypeEdit.querySelector(".popup__form");
const nameInput = formElementTypeEdit.querySelector(".popup__input_type_name");
const jobInput = formElementTypeEdit.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// @todo: Выводит все карточки из массива initialCards файла cards.js
renderCards(initialCards);

// @todo: Функций закрытия popup через крестик для всех popup
popUps.forEach((popup) => {
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
      name: namePlace.value,
      link: urlCardImage.value,
    };
  
    const card = createCard(cardData.name, cardData.link, deleteCard, likeCard, openPopUpImage);
  
    cardsContainer.prepend(card);
    closePopUp(popupTypeNewCard);
  
    formElementTypeNewCard.reset();
}

// @todo: Функция редактирования профиля
function addNewProfile(evt) {
    evt.preventDefault();
  
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
  
    closePopUp(popupTypeEdit);
  
    formElementTypeEdit.reset();
}

// @todo: Функция заполнения полей профиля перед открытием попапа
function addProfileValues() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

// @todo: Добавляем обработчики событий для открытия попапов
profileEditButton.addEventListener("click", () => {
    openPopUp(popupTypeEdit);
    addProfileValues();
});

profileAddButton.addEventListener("click", () =>
    openPopUp(popupTypeNewCard)
);

// @todo: Добавляем обработчики событий для форм
formElementTypeEdit.addEventListener("submit", addNewProfile);
formElementTypeNewCard.addEventListener("submit", addNewCard);