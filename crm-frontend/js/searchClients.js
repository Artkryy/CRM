import { serverFindClient } from "./API.js";
import { createClientItem } from "./createClientItem.js";

export const searchClients = (clients) => {
  const $findList = document.querySelector(".header__find-list"),
    $input = document.querySelector(".header__search");

  clients.forEach((client) => {
    const $findItem = document.createElement("li"),
      $findLink = document.createElement("a");

    $findItem.classList.add("find-list__item");
    $findLink.classList.add("find-list__link");

    $findLink.textContent = `${client.surname} ${client.name} ${client.lastName}`;
    $findLink.href = "#";

    $findItem.append($findLink);
    $findList.append($findItem);
  });

  const redrawingTable = async (str) => {
    const response = await serverFindClient(str);
    const $tbody = document.querySelector(".clients__tbody");
    $tbody.innerHTML = "";

    for (const client of response) {
      $tbody.append(createClientItem(client));
    }
  };

  $input.addEventListener("input", async () => {
    const value = $input.value.trim();
    const foundItem = document.querySelectorAll(".find-list__link");

    if (value !== "") {
      redrawingTable(value);

      foundItem.forEach((link) => {
        if (link.innerText.search(value) == -1) {
          link.classList.add("invisible");
          link.innerHTML = link.innerText;
        } else {
          link.classList.remove("invisible");
          $findList.classList.remove("invisible");
          const str = link.innerText
          link.innerHTML = textSelection(str, link.innerText.search(value), value.length)
        }
      });
    } else {
      foundItem.forEach(link => {
        const $tbody = document.querySelector('.clients__tbody')
        $tbody.innerHTML = ''

        clients.forEach(client => $tbody.append(createClientItem(client)))

        link.classList.remove('invisible')
        $findList.classList.add('invisible')
        link.innerHTML = link.innerText
      })
    }
  });

  const textSelection = (str, pos, len) =>
    str.slice(0, pos) +
    "<mark>" +
    str.slice(pos, pos + len) +
    "</mark>" +
    str.slice(pos + len);
};
