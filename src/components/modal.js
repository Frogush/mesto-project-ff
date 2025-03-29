// Функция реагирования на клавишу Esc
function handleClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopUp(openedPopup);
    }
  }
}

// Функция открытия попапа
export function openPopUp(popUp) {
  popUp.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleClose);
}

// Функция закрытия попапа
export function closePopUp(popUp) {
  popUp.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleClose);
}
