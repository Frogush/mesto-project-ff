const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(card, onDelete, handleLike, onImageClick, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeCounter.textContent = card.likes.length;

  if (card.owner._id !== userId) {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", () => onDelete(card._id, cardElement));
  
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    handleLike(card._id, isLiked, likeButton, likeCounter);
  });

  cardImage.addEventListener("click", () => onImageClick(card.link, card.name));

  return cardElement;
}

// Функция удаления карточки
export function removeCard(cardElement) {
  cardElement.remove();
}

// Функция лайка
export function toggleLikeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// Функция подсчёта лайка
export function updateLikeCard(likeCaunter, likes) {
  likeCaunter.textContent = likes.length;
}
