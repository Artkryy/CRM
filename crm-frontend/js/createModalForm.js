import { addContactSvgDef, addContactSvgHov, svgLoadSpinner } from "./svg.js";
import { createContactsItem } from "./addContacts.js";

export const createClientsModalForm = () => {
  const $closeChangeWindow = document.createElement("button"),
    $changeTitle = document.createElement("h2"),
    $formChange = document.createElement("form"),
    $formFloatSurname = document.createElement("div"),
    $changeSurnameLabel = document.createElement("label"),
    $changeSurnameInp = document.createElement("input"),
    $requaredSurname = document.createElement("span"),
    $formFloatName = document.createElement("div"),
    $changeNameLabel = document.createElement("label"),
    $changeNameInp = document.createElement("input"),
    $requaredName = document.createElement("span"),
    $formFloatLastName = document.createElement("div"),
    $changeLastNameLabel = document.createElement("label"),
    $changeLastNameInp = document.createElement("input"),
    $modalContactBlock = document.createElement("div"),
    $addContactBtn = document.createElement("button"),
    $addContactBtnSvgDef = document.createElement("span"),
    $addContactBtnSvgHov = document.createElement("span"),
    $wrapBtn = document.createElement("div"),
    $saveBtn = document.createElement("button"),
    $cancelBtn = document.createElement("button"),
    $errorBlock = document.createElement("p"),
    $unacceptableLetter = document.createElement("span"),
    $writeSurname = document.createElement("span"),
    $writeName = document.createElement("span"),
    $writeLastName = document.createElement("span"),
    $requiredValue = document.createElement("span"),
    $requiredContacts = document.createElement("span"),
    $loadSpinner = document.createElement("span");

  $loadSpinner.classList.add("modal__spinner");
  $closeChangeWindow.classList.add("modal__close-change", "btn-reset");
  $changeTitle.classList.add("modal__title");
  $formFloatSurname.classList.add("form-float");
  $formFloatName.classList.add("form-float");
  $formFloatLastName.classList.add("form-float");
  $formChange.classList.add("modal__form", "form");
  $changeSurnameLabel.classList.add("form__modal-label");
  $changeSurnameInp.classList.add("form__surname-inp", "modal-inp");
  $changeNameLabel.classList.add("form__modal-label");
  $changeNameInp.classList.add("form__name-inp", "modal-inp");
  $changeLastNameLabel.classList.add("form__modal-label");
  $changeLastNameInp.classList.add("form__lastName-inp", "modal-inp");
  $modalContactBlock.classList.add("modal__contact-block");
  $addContactBtn.classList.add(
    "btn-reset",
    "form__add-contact-btn",
    "form__add-contact-btn--active"
  );
  $addContactBtnSvgDef.classList.add(
    "form__btn-svg",
    "form__btn-svg--default",
    "form__btn-svg--active"
  );
  $addContactBtnSvgHov.classList.add("form__btn-svg", "form__btn-svg--hover");
  $wrapBtn.classList.add("form__wrap-btn");
  $saveBtn.classList.add("form__save-btn", "btn-reset");
  $cancelBtn.classList.add("form__cancel-btn", "btn-reset");

  $formChange.id = "change-form";
  $changeSurnameInp.id = "formFloatSurname";
  $changeSurnameInp.placeholder = "Фамилия";
  $changeNameInp.id = "formFloatName";
  $changeNameInp.placeholder = "Имя";
  $changeLastNameInp.id = "formFloatLastName";
  $changeLastNameInp.placeholder = "Отчество";

  $changeTitle.textContent = "Новый клиент";
  $changeSurnameLabel.textContent = "Фамилия";
  $changeNameLabel.textContent = "Имя";
  $changeLastNameLabel.textContent = "Отчество";
  $changeSurnameLabel.for = "formFloatSurname";
  $changeNameLabel.for = "formFloatName";
  $changeLastNameLabel.for = "formFloatLastName";

  $requaredSurname.textContent = "*";
  $requaredName.textContent = "*";
  $requaredSurname.style.color = "#9873FF";
  $requaredName.style.color = "#9873FF";

  $addContactBtn.innerHTML = "Добавить контакт";
  $saveBtn.textContent = "Сохранить";
  $cancelBtn.textContent = "Отмена";
  $addContactBtnSvgDef.innerHTML = addContactSvgDef;
  $addContactBtnSvgHov.innerHTML = addContactSvgHov;
  $loadSpinner.innerHTML = svgLoadSpinner;

  $changeSurnameInp.type = "text";
  $changeNameInp.type = "text";
  $changeLastNameInp.type = "text";

  $errorBlock.classList.add("modal__error");
  $unacceptableLetter.id = "unacceptableLetter";
  $writeSurname.id = "writeSurname";
  $writeName.id = "writeName";
  $writeLastName.id = "writeLastName";
  $requiredValue.id = "requiredValue";
  $requiredContacts.id = "requiredContacts";

  $addContactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const contactsItems = document.getElementsByClassName("contact");

    if (contactsItems.length < 9) {
      const contactItem = createContactsItem();
      $modalContactBlock.prepend(contactItem.$contact);
      $modalContactBlock.style.backgroundColor =
        "var(--color-contacts-bg-active)";
    } else {
      const contactItem = createContactsItem();
      $modalContactBlock.prepend(contactItem.$contact);
      $addContactBtn.classList.remove("form__add-contact-btn--active");
    }
  });

  $addContactBtn.addEventListener("mouseover", () => {
    $addContactBtnSvgDef.classList.remove("form__btn-svg--active");
    $addContactBtnSvgHov.classList.add("form__btn-svg--active");
  });

  $addContactBtn.addEventListener("mouseleave", () => {
    $addContactBtnSvgDef.classList.add("form__btn-svg--active");
    $addContactBtnSvgHov.classList.remove("form__btn-svg--active");
  });

  $changeSurnameLabel.append($requaredSurname);
  $changeNameLabel.append($requaredName);
  $saveBtn.prepend($loadSpinner)
  $formFloatSurname.append($changeSurnameInp, $changeSurnameLabel);
  $formFloatName.append($changeNameInp, $changeNameLabel);
  $formFloatLastName.append($changeLastNameInp, $changeLastNameLabel);
  $addContactBtn.append($addContactBtnSvgDef, $addContactBtnSvgHov);
  $modalContactBlock.append($addContactBtn);
  $errorBlock.append(
    $writeSurname,
    $writeName,
    $writeLastName,
    $requiredValue,
    $unacceptableLetter,
    $requiredContacts
  );
  $wrapBtn.append($saveBtn, $cancelBtn);
  $formChange.append(
    $formFloatSurname,
    $formFloatName,
    $formFloatLastName,
    $modalContactBlock,
    $errorBlock,
    $wrapBtn
  );

  return {
    $formChange,
    $changeTitle,
    $modalContactBlock,
    $changeNameInp,
    $changeSurnameInp,
    $changeLastNameInp,
    $addContactBtn,
    $saveBtn,
    $cancelBtn,
    $closeChangeWindow,
  };
};
