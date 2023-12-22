const createErrorMessage = (errorText) => {
  const errorMessage = document.createElement("span");

  errorMessage.classList.add("error");

  errorMessage.textContent = errorText;

  return errorMessage;
};

const showErrMessage = (errContainer, errElem, inp) => {
  inp.classList.add("err-mes");
  errContainer.append(errElem);
};

const cleanErrMessage = (container, inp) => {
  if (inp.classList.contains("err-mes")) {
    const errMessEl = container.querySelector(".error");
    inp.classList.remove("err-mes");
    errMessEl.remove();
  }
};

export const showErrorsMessages = (inputs, errors = []) => {
  for (const input of inputs) {
    const errorBlock = document.querySelector(".modal__error");
    const hasErr = errors.find((err) => input.id === err.field);

    if (hasErr) {
      input.style.borderColor = "var(--color-del-contact-hover)";
      cleanErrMessage(errorBlock, input);

      const errElem = createErrorMessage(hasErr.message);
      showErrMessage(errorBlock, errElem, input);
    } else {
      cleanErrMessage(errorBlock, input);
      input.style.borderColor = "var(--color-contacts-bg)";
    }
  }
};

export const validateClientForm = () => {
  const clientSurname = document.getElementById("surname"),
    clientName = document.getElementById("name"),
    clientLastName = document.getElementById("lastName"),
    unacceptableLetter = document.getElementById("unacceptableLetter");

  const regexp = /[^а-яА-ЯёЁ]+$/g;

  const checkByRegexp = (input, regexp, message) => {
    if (regexp.test(input.value.trim())) {
      input.style.borderColor = "var(--color-del-contact-hover)";
      unacceptableLetter.textContent = `Недопустимые символы в ${message}!`;
      return false;
    }
    return true;
  };

  if (!checkByRegexp(clientSurname, regexp, "поле 'Фамилия'")) {
    return false;
  }
  if (!checkByRegexp(clientName, regexp, "поле 'Имя'")) {
    return false;
  }
  if (!checkByRegexp(clientLastName, regexp, "поле 'Отчество'")) {
    return false;
  }
  unacceptableLetter.innerHTML = "";

  return true;
};
