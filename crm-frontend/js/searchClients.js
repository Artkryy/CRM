import { serverFindClient, serverGetClients } from "./API.js";
import { createClientItem } from "./createClientItem.js";
import { debounce } from "./utils.js";

export const searchClients = (clients) => {
  const $input = document.querySelector(".header__search");

  const rewriteTable = async (str) => {
    const response = await serverFindClient(str);
    const tbody = document.querySelector(".clients__tbody");
    tbody.innerHTML = "";

    for (const client of response) {
      tbody.append(createClientItem(client));
    }
  };

  const handleInput = async () => {
    const value = $input.value.trim();

    if (value !== "") {
      await rewriteTable(value);
    } else {
      const tbody = document.querySelector(".clients__tbody");
      tbody.innerHTML = "";

      const clients = await serverGetClients();

      for (const oneClient of clients) {
        document
          .querySelector(".clients__tbody")
          .append(createClientItem(oneClient));
      }
    }
  };

  const debouncedHandle = debounce(handleInput, 300);

  $input.addEventListener("input", debouncedHandle);
};
