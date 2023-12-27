import { serverGetClients } from "./API.js";
import { createClientItem } from "./createClientItem.js";

export const sortTable = (clients) => {
  const table = document.querySelector("table");
  const tableBody = table.querySelector("tbody");

  let sortDirFlag = false;

  const idSort = document.getElementById("head-id");
  const fullnameSort = document.getElementById("head-fullname");
  const createSort = document.getElementById("head-create");
  const updateSort = document.getElementById("head-update");

  const sortArr = (arr, prop) => {
    const copyArr = arr;
    const result = copyArr.sort((a, b) => {
      let direct = a[prop] < b[prop];
      if (sortDirFlag === true) direct = a[prop] > b[prop];
      if (direct) return -1;
    });
    return result;
  };

  idSort.addEventListener("click", async () => {
    sortDirFlag = !sortDirFlag;
    const clientsArr = await serverGetClients();

    sortArr(clientsArr, "id", sortDirFlag);
    tableBody.innerHTML = "";

    for (const oneClient of clientsArr) {
      document
        .querySelector(".clients__tbody")
        .append(createClientItem(oneClient));
    }
  });

  fullnameSort.addEventListener("click", async () => {
    sortDirFlag = !sortDirFlag;
    const clientsArr = await serverGetClients();

    sortArr(clientsArr, "surname", sortDirFlag);
    tableBody.innerHTML = "";

    for (const oneClient of clientsArr) {
      document
        .querySelector(".clients__tbody")
        .append(createClientItem(oneClient));
    }
  });

  createSort.addEventListener("click", async () => {
    sortDirFlag = !sortDirFlag;
    const clientsArr = await serverGetClients();

    sortArr(clientsArr, "createdAt", sortDirFlag);
    tableBody.innerHTML = "";

    for (const oneClient of clientsArr) {
      document
        .querySelector(".clients__tbody")
        .append(createClientItem(oneClient));
    }
  });

  updateSort.addEventListener("click", async () => {
    sortDirFlag = !sortDirFlag;
    const clientsArr = await serverGetClients();

    sortArr(clientsArr, "updatedAt", sortDirFlag);
    tableBody.innerHTML = "";

    for (const oneClient of clientsArr) {
      document
        .querySelector(".clients__tbody")
        .append(createClientItem(oneClient));
    }
  });
};
