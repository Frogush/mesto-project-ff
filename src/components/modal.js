// DOM узлы: Все PopUp's
const popups = document.querySelectorAll(".popup");

// DOM узлы: Попап изображения
const popupTypeImage = document.querySelector(".popup_type_image");
const popUpImage = popupTypeImage.querySelector(".popup__image");
const popUpCaption = popupTypeImage.querySelector(".popup__caption");

// @todo: Функция реагирования на клавишу Esc
function handleClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopUp(openedPopup);
    }
  }
}

// @todo: Функция открытия попапа
export function openPopUp(popUp) {
  popUp.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleClose);
}

// @todo: Функция закрытия попапа
export function closePopUp(popUp) {
  popUp.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleClose);
}

// @todo: Функция открытия попапа с изображением
export function openPopUpImage(link, name) {
  popUpImage.src = link;
  popUpImage.alt = "Изображение " + name;
  popUpCaption.textContent = name;
  openPopUp(popupTypeImage);
}

// @todo: Добавление закрытия для всех popup через крестик и оверлей
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", () => closePopUp(popup));

  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopUp(popup);
    }
  });

  popup.classList.add("popup_is-animated");
});