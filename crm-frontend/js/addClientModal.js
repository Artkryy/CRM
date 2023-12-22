import { serverSendClient } from "./API.js";
import { createClientsModalForm } from "./createModalForm.js";
import { validateClientForm } from "./createValidateForm.js";

export const createAddClientsModal = () => {
  const $createForm = createClientsModalForm();
  const $modal = document.createElement("div"),
    $modalContent = document.createElement("div");

  $modal.classList.add("modal", "site-modal", "modal-active");
  $modalContent.classList.add(
    "modal__content",
    "modal__content-active",
    "modal-active"
  );
  $createForm.$formChange.classList.add("add-client");
  $modal.id = 'add-modal'

  $createForm.$formChange.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validateClientForm()) {
      return;
    }
    let contacts = [];

    const clientObj = {};

    const contactTypes = document.querySelectorAll(".contact__name");
    const contactVal = document.querySelectorAll(".contact__input");

    (clientObj.surname = $createForm.$changeSurnameInp.value.trim()),
      (clientObj.name = $createForm.$changeNameInp.value.trim()),
      (clientObj.lastName = $createForm.$changeLastNameInp.value.trim()),
      (clientObj.contacts = contacts);

    for (let i = 0; i < contactTypes.length; i++) {
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactVal[i].value,
      });
    }

    const spinner = document.querySelector(".modal__spinner");

    try {
      spinner.style.display = "block";
      await serverSendClient(clientObj, "POST");
    } catch (error) {
      console.log(error);
    } finally {
      spinner.style.display = "none";
    }
  });

  $createForm.$closeChangeWindow.addEventListener("click", () => {
    $modal.remove();
  });

  $createForm.$cancelBtn.addEventListener("click", () => {
    $modal.remove();
  });

  document.addEventListener("click", (e) => {
    if (e.target === $modal) {
      $modal.remove();
    }
  });

  $modal.append($modalContent);
  $modalContent.append(
    $createForm.$closeChangeWindow,
    $createForm.$changeTitle,
    $createForm.$formChange
  );

  return $modal;
};
