import { serverGetClients } from "./API.js";
import { createClientItem } from "./createClientItem.js";
import { createClientsSection } from "./createClientsSection.js";
import { createHeader } from "./createHeader.js";
import { searchClients } from "./searchClients.js";
import { sortTable } from "./sortClientsTable.js";

const clientsApp = async () => {
  const $header = createHeader();
  const $clientSection = createClientsSection();
  document.body.append($header, $clientSection.$main);
  const preloader = document.querySelector(".preloader");

  try {
    const clients = await serverGetClients();
    searchClients(clients);

    for (const oneClient of clients) {
      document
        .querySelector(".clients__tbody")
        .append(createClientItem(oneClient));
    }
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => preloader.remove(), 500);
  }
};

clientsApp();
document.addEventListener("DOMContentLoaded", sortTable);
