const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(name, link, onDelete, onLike, onImageClick) {
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

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка
export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
