import { svgContactDel } from "./svg.js";

export const createContactsItem = () => {
  const $contact = document.createElement("div"),
    $contactType = document.createElement("div"),
    $contactName = document.createElement("button"),
    $contactList = document.createElement("ul"),
    $contactAddPhone = document.createElement("li"),
    $contactMail = document.createElement("li"),
    $contactVk = document.createElement("li"),
    $contactFb = document.createElement("li"),
    $contactOther = document.createElement("li"),
    $contactInp = document.createElement("input"),
    $contactDel = document.createElement("button"),
    $contactDelTool = document.createElement("span");

  $contact.classList.add("contact");
  $contactDelTool.classList.add("contact__tooltip", "site-tooltip");
  $contactType.classList.add("contact__type");
  $contactName.classList.add("contact__name", "btn-reset");
  $contactList.classList.add("contact__list", "list-reset");
  $contactAddPhone.classList.add("contact__item");
  $contactMail.classList.add("contact__item");
  $contactVk.classList.add("contact__item");
  $contactFb.classList.add("contact__item");
  $contactOther.classList.add("contact__item");
  $contactInp.classList.add("contact__input");
  $contactDel.classList.add("contact__btn-delete", "btn-reset");

  $contactName.textContent = "Телефон";
  $contactAddPhone.textContent = "Доп. Телефон";
  $contactMail.textContent = "Email";
  $contactVk.textContent = "VK";
  $contactFb.textContent = "Facebook";
  $contactOther.textContent = "Другое";
  $contactDelTool.textContent = "Удалить контакт";

  $contactInp.placeholder = "Введите данные контакта";
  $contactDel.innerHTML = svgContactDel;

  $contactDel.addEventListener("click", (e) => {
    e.preventDefault();
    $contact.remove();
    document
      .querySelector(".form__add-contact-btn")
      .classList.add("form__add-contact-btn--active");
  });

  $contactName.addEventListener("click", (e) => {
    e.preventDefault();
    $contactList.classList.toggle("contact__list--active");
    $contactName.classList.toggle("contact__list--active");
  });

  $contactType.addEventListener("mouseleave", () => {
    $contactList.classList.remove("contact__list--active");
    $contactName.classList.remove("contact__list--active");
  });

  const choiceType = (type) => {
    type.addEventListener("click", () => {
      $contactName.textContent = type.textContent;
      $contactList.classList.remove("contact__list--active");
      $contactName.classList.remove("contact__list--active");
    });
  };

  const typeArr = [
    $contactAddPhone,
    $contactMail,
    $contactFb,
    $contactVk,
    $contactOther,
  ];

  for (const type of typeArr) {
    choiceType(type);
  }

  $contactDel.append($contactDelTool);
  $contact.append($contactType, $contactInp, $contactDel);
  $contactType.append($contactName, $contactList);
  $contactList.append(
    $contactAddPhone,
    $contactMail,
    $contactVk,
    $contactFb,
    $contactOther
  );

  return {
    $contact,
    $contactList,
    $contactInp,
    $contactName,
    $contactDel,
  };
};
