import { serverGetClients } from "./API.js";
import { createClientItem } from "./createClientItem.js";
import { createClientsSection } from "./createClientsSection.js";
import { createHeader } from "./createHeader.js";
import { searchClients } from "./searchClients.js";
import { sortTable } from "./sortClientsTable.js";
import { skrollTable } from "./utils.js";

const clientsApp = async () => {
  const $header = createHeader();
  const $clientSection = createClientsSection();
  document.body.append($header, $clientSection.$main);
  const preloader = document.querySelector(".preloader");
  skrollTable()

  try {
    const clients = await serverGetClients();
    searchClients(clients);
    sortTable(clients);

    for (const oneClient of clients) {
      document
        .querySelector(".clients__tbody")
        .append(createClientItem(oneClient));
    }
  } catch (error) {
    console.log(error);
  } finally {
    preloader.remove();
  }
};

clientsApp();
