import { createModalDelete } from "./createModalDelete.js";
import { createEditClientModal } from "./editClientModal.js";
import { svgLoadSpinner } from "./svg.js";
import {
  formatDate,
  formatTime,
  createContactItemByType,
  createMoreBtn,
} from "./utils.js";

export const createClientItem = (oneClient) => {
  const $oneClientRow = document.createElement("tr"),
    $oneClientIdTd = document.createElement("td"),
    $oneClientId = document.createElement("span"),
    $oneClientFullName = document.createElement("td"),
    $oneClientName = document.createElement("span"),
    $oneClientSurname = document.createElement("span"),
    $oneClientLastName = document.createElement("span"),
    $oneClientCreate = document.createElement("td"),
    $oneClientCreateDate = document.createElement("span"),
    $oneClientCreateTime = document.createElement("span"),
    $oneClientUpdate = document.createElement("td"),
    $oneClientUpdateDate = document.createElement("span"),
    $oneClientUpdateTime = document.createElement("span"),
    $oneClientContacts = document.createElement("td"),
    $oneClientActions = document.createElement("td"),
    $actionChangeBtn = document.createElement("button"),
    $actionDeleteBtn = document.createElement("button"),
    $changeSpinner = document.createElement("span"),
    $deleteSpinner = document.createElement("span");

  const deleteClient = createModalDelete();
  const editClient = createEditClientModal(oneClient);

  $oneClientRow.classList.add("clients__item");
  $oneClientRow.id = oneClient.id;
  $oneClientIdTd.classList.add("client__id");
  $oneClientFullName.classList.add("clients__fullname");
  $oneClientSurname.classList.add("clients__surname");
  $oneClientName.classList.add("clients__name");
  $oneClientLastName.classList.add("clients__lastName");
  $oneClientCreate.classList.add("clients__created");
  $oneClientCreateDate.classList.add("created__date");
  $oneClientCreateTime.classList.add("created__time");
  $oneClientUpdate.classList.add("clients__updated");
  $oneClientUpdateDate.classList.add("updated__date");
  $oneClientUpdateTime.classList.add("updated__time");
  $oneClientContacts.classList.add("clients__contacts");
  $oneClientActions.classList.add("clients__actions");
  $actionChangeBtn.classList.add("clients__edit", "btn-reset");
  $actionDeleteBtn.classList.add("clients__delete", "btn-reset");
  $changeSpinner.classList.add("actions__spinner", "actions__spinner--change");
  $deleteSpinner.classList.add("actions__spinner", "actions__spinner--delete");

  $oneClientId.textContent = oneClient.id.substr(7, 13);
  $oneClientSurname.textContent = oneClient.surname;
  $oneClientName.textContent = oneClient.name;
  $oneClientLastName.textContent = oneClient.lastName;
  $actionChangeBtn.textContent = "Изменить";
  $actionDeleteBtn.textContent = "Удалить";
  $oneClientCreateDate.textContent = formatDate(oneClient.createdAt);
  $oneClientCreateTime.textContent = formatTime(oneClient.createdAt);
  $oneClientUpdateDate.textContent = formatDate(oneClient.updatedAt);
  $oneClientUpdateTime.textContent = formatTime(oneClient.updatedAt);
  $changeSpinner.innerHTML = svgLoadSpinner;
  $deleteSpinner.innerHTML = svgLoadSpinner;

  for (const contact of oneClient.contacts) {
    createContactItemByType(contact.type, contact.value, $oneClientContacts);
  }

  const clientContacts = $oneClientContacts.querySelectorAll(".contact__link");
  const contactsArr = [...clientContacts];

  const checkContactsLength = (contactsElems) => {
    if (contactsElems.length > 4) {
      const hiddenContacts = contactsElems.slice(4);
      hiddenContacts.forEach((item) => item.classList.add("contacts__hide"));
      const moreBtn = createMoreBtn(hiddenContacts.length);
      $oneClientContacts.append(moreBtn);

      moreBtn.addEventListener("click", () => {
        hiddenContacts.forEach((item) =>
          item.classList.remove("contacts__hide")
        );
        moreBtn.remove();
      });
    }
  };
  checkContactsLength(contactsArr);

  const deleteById = () => {
    import("./API.js").then(({ serverDeleteClient }) => {
      deleteClient.$modalDeleteBtn.addEventListener("click", () => {
        try {
          deleteClient.$loadSpinner.style.display = "block";
          serverDeleteClient(oneClient.id);
          document.getElementById(oneClient.id).remove();
          deleteClient.$deleteModal.remove();
        } catch (error) {
          console.log(error);
        } finally {
          deleteClient.$loadSpinner.style.display = "none";
        }
      });
    });
  };

  $actionDeleteBtn.addEventListener("click", () => {
    $deleteSpinner.style.display = "block";
    $actionDeleteBtn.classList.add("action-load");
    deleteById();
    document.body.append(deleteClient.$deleteModal);
    $deleteSpinner.style.display = "none";
    $actionDeleteBtn.classList.remove("action-load");
  });

  $actionChangeBtn.addEventListener("click", () => {
    $changeSpinner.style.display = "block";
    $actionChangeBtn.classList.add("action-load");
    document.body.append(editClient.$editModal);
    $changeSpinner.style.display = "none";
    $actionChangeBtn.classList.remove("action-load");
  });

  $oneClientIdTd.append($oneClientId);
  $oneClientFullName.append(
    $oneClientSurname,
    $oneClientName,
    $oneClientLastName
  );
  $oneClientCreate.append($oneClientCreateDate, $oneClientCreateTime);
  $oneClientUpdate.append($oneClientUpdateDate, $oneClientUpdateTime);
  $oneClientActions.append($actionChangeBtn, $actionDeleteBtn);
  $actionChangeBtn.prepend($changeSpinner);
  $actionDeleteBtn.prepend($deleteSpinner);
  $oneClientRow.append(
    $oneClientIdTd,
    $oneClientFullName,
    $oneClientCreate,
    $oneClientUpdate,
    $oneClientContacts,
    $oneClientActions
  );

  return $oneClientRow;
};
