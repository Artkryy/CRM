import { createClientItem } from "./createClientItem.js";

const SET_TIMEOUT_BG = 1500;

export const searchClients = (clients) => {
  const $findList = document.querySelector(".header__find-list"),
    $input = document.querySelector(".header__search");

  clients.forEach((client) => {
    const $findItem = document.createElement("li"),
      $findLink = document.createElement("a");

    $findItem.classList.add("find-list__item");
    $findLink.classList.add("find-list__link");

    $findLink.textContent = `${client.surname} ${client.name} ${client.lastName}`;
    $findLink.href = `#${client.id}`;

    $findLink.addEventListener("click", () => {
      const clientRow = document.getElementById(client.id);
      clientRow.style.backgroundColor = "var(--color-contacts-bg-active)";
      setTimeout(() => {
        clientRow.style.backgroundColor = "var(--color-white)";
      }, SET_TIMEOUT_BG);
      $input.value = "";
      $findList.classList.add("invisible");
    });

    $findItem.append($findLink);
    $findList.append($findItem);
  });

  $input.addEventListener("input", () => {
    const value = $input.value.trim();
    const foundItem = document.querySelectorAll(".find-list__link");

    if (value !== "") {
      foundItem.forEach((link) => {
        if (link.innerText.search(value) == -1) {
          link.classList.add("invisible");
          link.innerHTML = link.innerText;
        } else {
          link.classList.remove("invisible");
          $findList.classList.remove("invisible");
          const str = link.innerText;
          link.innerHTML = textSelection(
            str,
            link.innerText.search(value),
            value.length
          );
        }
      });
    } else {
      foundItem.forEach((link) => {
        const $tbody = document.querySelector(".clients__tbody");
        $tbody.innerHTML = "";

        clients.forEach((client) => $tbody.append(createClientItem(client)));

        link.classList.remove("invisible");
        $findList.classList.add("invisible");
        link.innerHTML = link.innerText;
      });
    }
  });

  const textSelection = (str, pos, len) =>
    str.slice(0, pos) +
    "<mark>" +
    str.slice(pos, pos + len) +
    "</mark>" +
    str.slice(pos + len);
};
