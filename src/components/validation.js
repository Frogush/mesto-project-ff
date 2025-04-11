// Запускает валидацию для всех форм на странице
export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, settings);
  });
}

// Устанавливает обработчики событий на все поля ввода формы
function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  //toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

// Активация или деактивация кнопки отправки формы в зависимости от валидности всех полей
function toggleButtonState(inputList, buttonElement, settings) {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasInvalidInput) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Проверить поле ввода на валидность, показать или скрыть ошибку
function checkInputValidity(formElement, inputElement, settings) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

// Показать сообщение об ошибке для конкретного поля ввода
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
  errorElement.textContent = errorMessage;
}

// Скрыть сообщение об ошибке, если поле ввода теперь валидно.
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
}

// Полностью очищает валидацию формы: скрывает все ошибки и устанавливает нужное состояние кнопки
export function clearValidation(formElement, settings) {
  // Прохожусь по всем полям ввода и очищаю ошибки
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });
  // Прохожусь по всем кнопкам и сбрасываю активность
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
}










