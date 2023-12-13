import { svgLoadSpinner } from "./svg.js";

export const createModalDelete = () => {
  const $deleteModal = document.createElement("div"),
    $deleteModalContent = document.createElement("div"),
    $modalClose = document.createElement("button"),
    $deleteModalTitle = document.createElement("h2"),
    $deleteModalText = document.createElement("p"),
    $modalDeleteBtn = document.createElement("button"),
    $deleteModalCancel = document.createElement("button"),
    $btnWrap = document.createElement("div"),
    $loadSpinner = document.createElement('span')

  $deleteModal.classList.add("delete-modal", "site-modal", "modal-active");
  $deleteModalContent.classList.add(
    "delete-modal__content",
    "modal__content-active",
    "modal-active"
  );
  $modalClose.classList.add(
    "delete-modal__close",
    "modal__close-change",
    "btn-reset"
  );
  $deleteModalTitle.classList.add("delete-modal__title");
  $deleteModalText.classList.add("delete-modal__text");
  $btnWrap.classList.add("delete-modal__btn-wrap");
  $modalDeleteBtn.classList.add("delete-modal__btn-delete", "btn-reset");
  $deleteModalCancel.classList.add("delete-modal__btn-cancel", "btn-reset");
  $loadSpinner.classList.add('modal__spinner')

  $loadSpinner.innerHTML = svgLoadSpinner
  $deleteModalTitle.textContent = "Удалить клиента";
  $deleteModalText.textContent =
    "Вы действительно хотите удалить данного клиента?";
  $modalDeleteBtn.textContent = "Удалить";
  $deleteModalCancel.textContent = "Отмена";

  $modalClose.addEventListener("click", () => {
    $deleteModal.remove();
  });

  $deleteModalCancel.addEventListener("click", () => {
    $deleteModal.remove();
  });

  window.addEventListener("click", (e) => {
    if (e.target === $deleteModal) {
      $deleteModal.remove();
    }
  });

  $modalDeleteBtn.prepend($loadSpinner)
  $deleteModalContent.append(
    $modalClose,
    $deleteModalTitle,
    $deleteModalText,
    $modalDeleteBtn,
    $deleteModalCancel
  );
  $deleteModal.append($deleteModalContent);

  return {
    $deleteModal,
    $deleteModalContent,
    $modalDeleteBtn,
    $loadSpinner
  };
};
