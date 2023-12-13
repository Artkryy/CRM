export const validateClientForm = () => {
  const clientSurname = document.getElementById("formFloatSurname"),
    clientName = document.getElementById("formFloatName"),
    clientLastName = document.getElementById("formFloatLastName"),
    unacceptableLetter = document.getElementById("unacceptableLetter"),
    writeSurname = document.getElementById("writeSurname"),
    writeName = document.getElementById("writeName"),
    writeLastName = document.getElementById("writeLastName"),
    requiredValue = document.getElementById("requiredValue");

  const validateArr = [
    unacceptableLetter,
    writeSurname,
    writeName,
    writeLastName,
    requiredValue,
  ];
  const regexp = /[^а-яА-ЯёЁ]+$/g;

  const onInputValue = (input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "var(--color-contacts-bg)";
      for (const item of validateArr) {
        item.textContent = "";
      }
    });

    input.oncut =
      input.oncopy =
      input.onpaste =
        () => {
          input.style.borderColor = "var(--color-contacts-bg)";
          for (const item of validateArr) {
            item.textContent = "";
          }
        };

    input.onchange = () => {
      input.style.borderColor = "var(--color-contacts-bg)";
      if (clientSurname.value && clientName.value && clientLastName.value) {
        for (const item of validateArr) {
          item.textContent = "";
        }
      }
    };
  };
  onInputValue(clientSurname);
  onInputValue(clientName);
  onInputValue(clientLastName);

  const checkRequiredName = (input, message, name) => {
    if (!input.value) {
      input.style.borderColor = "var(--color-del-contact-hover)";
      message.textContent = `Введите ${name} клиента!`;
      return false;
    } else {
      message.textContent = "";
    }

    return true;
  };

  const checkByRegexp = (input, regexp) => {
    if (regexp.test(input.value.trim())) {
      input.style.borderColor = "var(--color-del-contact-hover)";
      unacceptableLetter.textContent = `Недопустимые символы!`;
      return false;
    }
    return true;
  };

  if (!checkRequiredName(clientSurname, writeSurname, "Фамилию")) {
    return false;
  }
  if (!checkRequiredName(clientName, writeName, "Имя")) {
    return false;
  }
  if (!checkRequiredName(clientLastName, writeLastName, "Отчество")) {
    return false;
  }
  if (!checkByRegexp(clientSurname, regexp)) {
    return false;
  }
  if (!checkByRegexp(clientName, regexp)) {
    return false;
  }
  if (!checkByRegexp(clientLastName, regexp)) {
    return false;
  }

  return true;
};
