// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(button) {
  button.closest(".card").remove();
}

// @todo: Функция вывода всех карточек на страницу
function renderCards(cards) {
  cards.forEach((card) => {
    const cardElement = createCard(card.name, card.link, deleteCard);
    placesList.appendChild(cardElement);
  });
}

// Выводит все карточки из массива initialCard файла cards.js 
renderCards(initialCards);






























