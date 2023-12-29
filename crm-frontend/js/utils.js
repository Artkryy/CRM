import { contactTooltip } from "./createTolltip.js";
import {
  svgEmail,
  svgFb,
  svgOther,
  svgOtherPhone,
  svgPhone,
  svgVk,
} from "./svg.js";

export const formatDate = (date) => {
  const newDate = new Date(date);

  const correctDate = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const result = newDate.toLocaleString("ru", correctDate);

  return result;
};

export const formatTime = (date) => {
  const newDate = new Date(date);

  const correctDate = {
    hour: "numeric",
    minute: "numeric",
  };
  const result = newDate.toLocaleString("ru", correctDate);

  return result;
};

export const createMoreBtn = (num) => {
  const $moreBtn = document.createElement("button");

  $moreBtn.classList.add("contacts__more-btn", "btn-reset");

  $moreBtn.textContent = `+${num}`;

  return $moreBtn;
};

function createContactIconLink(type, value, element, svg, item) {
  element = document.createElement("a");
  element.classList.add("contact__link");
  element.innerHTML = svg;

  const $setTooltip = contactTooltip(type, value);

  if (type === "Email") {
    element.href = `mailto:${value.trim()}`;
  } else if (type === "Телефон") {
    element.href = `tel:${value.trim()}`;
    $setTooltip.$tooltipType.style.display = "none";
    $setTooltip.$tooltipValue.style.color = "var(--color-white)";
    $setTooltip.$tooltipValue.style.textDecoration = "none";
  } else if (type === "Доп. Телефон") {
    element.href = `tel:${value.trim()}`;
    $setTooltip.$tooltipType.style.display = "none";
    $setTooltip.$tooltipValue.style.color = "var(--color-white)";
    $setTooltip.$tooltipValue.style.textDecoration = "none";
  } else {
    element.href = value.trim();
  }

  element.append($setTooltip.$tooltip);
  item.append(element);
}

export const createContactItemByType = (type, value, item) => {
  switch (type) {
    case "Телефон":
      let phone;
      createContactIconLink(type, value, phone, svgPhone, item);
      break;
    case "Доп. Телефон":
      let addPhone;
      createContactIconLink(type, value, addPhone, svgOtherPhone, item);
      break;
    case "Email":
      let email;
      createContactIconLink(type, value, email, svgEmail, item);
      break;
    case "Facebook":
      let fb;
      createContactIconLink(type, value, fb, svgFb, item);
      break;
    case "VK":
      let vk;
      createContactIconLink(type, value, vk, svgVk, item);
      break;
    case "Другое":
      let other;
      createContactIconLink(type, value, other, svgOther, item);
      break;

    default:
      break;
  }
};

export const debounce = (calle, timeout) => {
  return function perform(...args) {
    let previousCall = this.lastCall;

    this.lastCall = Date.now();

    if (previousCall && this.lastCall - previousCall <= timeout) {
      clearTimeout(this.lastCallTimer);
    }

    this.lastCallTimer = setTimeout(() => calle(...args), timeout);
  };
};

export const skrollTable = () => {
  const INDEX_TRIGGER_SIZE = 50;
  const wrapTable = document.querySelector(".clients__table-wrapper");
  const headTableInfo = wrapTable.querySelector(".display-info");

  wrapTable.addEventListener("scroll", () => {
    if (headTableInfo.offsetTop > INDEX_TRIGGER_SIZE) {
      headTableInfo.style.zIndex = "3";
    } else {
      headTableInfo.style = "";
    }
  });
};
