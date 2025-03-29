import { openPopUp } from "./modal.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
export function createCard( name, link, onDelete, onLike, onImageClick ) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", () => onDelete(cardElement));
  likeButton.addEventListener("click", () => onLike(likeButton));
  cardImage.addEventListener("click", () => onImageClick(link, name));

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция вывода всех карточек на страницу
export function renderCards(cards) {
  cards.forEach((card) => {
    placesList.append(createCard(card.name, card.link, deleteCard, likeCard, openPopUpImage));
});
}

// @todo: Функция лайка
export function likeCard(likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
}

export function openPopUpImage(link, name) {
  const popupTypeImage = document.querySelector(".popup_type_image");
  const popUpImage = popupTypeImage.querySelector(".popup__image");
  const popUpCaption = popupTypeImage.querySelector(".popup__caption"); 

  popUpImage.src = link;
  popUpImage.alt = name;
  popUpCaption.textContent = name;
  openPopUp(popupTypeImage);
}