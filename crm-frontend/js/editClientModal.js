import { serverGetClients, serverSendClient } from "./API.js";
import { createContactsItem } from "./addContacts.js";
import { createModalDelete } from "./createModalDelete.js";
import { createClientsModalForm } from "./createModalForm.js";
import { createClientItem } from "./createClientItem.js";
import { validateClientForm } from "./createValidateForm.js";

export const createEditClientModal = (oneClient) => {
  const $editModal = document.createElement("div"),
    $editModalContent = document.createElement("div"),
    $editCreateForm = createClientsModalForm(),
    $editClientId = document.createElement("span");

  $editClientId.classList.add("modal-edit__id");
  $editModal.classList.add("modal-edit", "site-modal", "modal-active");
  $editModalContent.classList.add(
    "edit-modal__content",
    "modal__content-active",
    "modal-active"
  );

  $editCreateForm.$changeTitle.textContent = "Изменить данные";
  $editClientId.textContent = "ID: " + oneClient.id.substr(7, 13);
  $editCreateForm.$cancelBtn.textContent = "Удалить клиента";

  $editCreateForm.$changeNameInp.value = oneClient.name;
  $editCreateForm.$changeSurnameInp.value = oneClient.surname;
  $editCreateForm.$changeLastNameInp.value = oneClient.lastName;

  for (const contact of oneClient.contacts) {
    const createContact = createContactsItem();

    createContact.$contactName.textContent = contact.type;
    createContact.$contactInp.value = contact.value.trim();

    $editCreateForm.$modalContactBlock.prepend($editCreateForm.$contactBlock);
    $editCreateForm.$contactBlock.append(createContact.$contact)
    $editCreateForm.$modalContactBlock.style.backgroundColor =
      "var(--color-contacts-bg-active)";
  }

  if (oneClient.contacts.length === 10) {
    $editCreateForm.$addContactBtn.classList.remove(
      "form__add-contact-btn--active"
    );
  }

  $editCreateForm.$formChange.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateClientForm()) {
      return;
    }

    const contactTypes = document.querySelectorAll(".contact__name");
    const contactValues = document.querySelectorAll(".contact__input");

    let contacts = [];

    for (let i = 0; i < contactTypes.length; i++) {
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value,
      });
    }

    let client = {};

    client.surname = $editCreateForm.$changeSurnameInp.value.trim();
    client.name = $editCreateForm.$changeNameInp.value.trim();
    client.lastName = $editCreateForm.$changeLastNameInp.value.trim();
    client.contacts = contacts;

    const spinner = document.querySelector(".modal__spinner");

    try {
      spinner.style.display = "block";
      const сlients = await serverGetClients();
      const edit = await serverSendClient(client, "PATCH", oneClient.id);
      if (edit !== null) {
        const objIndex = сlients.findIndex(
          (obj) => Number(obj.id) === Number(oneClient.id)
        );
        сlients.splice(objIndex, 1, edit);
        document.getElementById(edit.id).replaceWith(createClientItem(edit));
      }

      $editModal.remove();
    } catch (error) {
      console.log(error);
    } finally {
      spinner.style.display = "none";
    }
  });

  $editCreateForm.$cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const deleteModal = createModalDelete();
    document.body.append(deleteModal.$deleteModal);

    import("./API.js").then(({ serverDeleteClient }) => {
      deleteModal.$modalDeleteBtn.addEventListener("click", () => {
        try {
          deleteModal.$loadSpinner.style.display = "block";
          serverDeleteClient(oneClient.id);
          document.getElementById(oneClient.id).remove();
          deleteModal.$deleteModal.remove();
          $editModal.remove();
        } catch (error) {
          console.log(error);
        } finally {
          deleteModal.$loadSpinner.style.display = "none";
        }
      });
    });
  });

  $editCreateForm.$closeChangeWindow.addEventListener("click", () => {
    $editModal.remove();
  });

  document.addEventListener("click", (e) => {
    if (e.target === $editModal) {
      $editModal.remove();
    }
  });

  $editCreateForm.$changeTitle.append($editClientId);
  $editModalContent.append(
    $editCreateForm.$closeChangeWindow,
    $editCreateForm.$changeTitle,
    $editCreateForm.$formChange
  );
  $editModal.append($editModalContent);

  return {
    $editModal,
    $editModalContent,
  };
};
