import { createAddClientsModal } from "./addClientModal.js";
import { createPreloader } from "./preloader.js";
import { svgAddClientsBtn } from "./svg.js";

export const createClientsSection = () => {
  const $main = document.createElement("main"),
    $section = document.createElement("section"),
    $container = document.createElement("div"),
    $title = document.createElement("h1"),
    $tableWrapper = document.createElement("div"),
    $clientsTable = document.createElement("table"),
    $sortingTableHead = document.createElement("thead"),
    $theadTr = document.createElement("tr"),
    $sortingTableHeadId = document.createElement("th"),
    $sortingTableHeadName = document.createElement("th"),
    $sortingTableHeadCreate = document.createElement("th"),
    $sortingTableHeadEdit = document.createElement("th"),
    $sortingTableHeadContacts = document.createElement("th"),
    $sortingTableHeadActions = document.createElement("th"),
    $sortingTableHeadSpan = document.createElement("span"),
    $addClientBtn = document.createElement("button"),
    $addClientBtnSvg = document.createElement("span"),
    $wrapperTbody = document.createElement("div"),
    $tableBody = document.createElement("tbody"),
    $createSpan = document.createElement("span"),
    $editSpan = document.createElement("span");

  const sortingDisplayItems = [
    $sortingTableHeadId,
    $sortingTableHeadName,
    $sortingTableHeadCreate,
    $sortingTableHeadEdit,
  ];

  for (const item of sortingDisplayItems) {
    item.addEventListener("click", () => {
      if (item.classList.contains("sort-down")) {
        item.classList.remove("sort-down");
        item.classList.add("sort-up");
      } else {
        item.classList.add("sort-down");
        item.classList.remove("sort-up");
      }
    });
  }

  $sortingTableHeadCreate.addEventListener("click", () => {
    if ($sortingTableHeadCreate.classList.contains("sort-down")) {
      $createSpan.classList.add("sort-up");
    } else {
      $createSpan.classList.remove("sort-up");
    }
  });

  $sortingTableHeadEdit.addEventListener("click", () => {
    if ($sortingTableHeadEdit.classList.contains("sort-down")) {
      $editSpan.classList.add("sort-up");
    } else {
      $editSpan.classList.remove("sort-up");
    }
  });

  $main.classList.add("main");
  $section.classList.add("clients");
  $container.classList.add("clients__container", "container");
  $title.classList.add("clients__title");
  $tableWrapper.classList.add("clients__table-wrapper");
  $clientsTable.classList.add("clients__table");
  $theadTr.classList.add('display-info__row')
  $sortingTableHead.classList.add("clients-display", "display-info");
  $sortingTableHeadId.classList.add(
    "display-info__item",
    "display-info__item--id",
    "sort-up"
  );
  $sortingTableHeadName.classList.add(
    "display-info__item",
    "display-info__item--name",
    "sort-down"
  );
  $sortingTableHeadCreate.classList.add(
    "display-info__item",
    "display-info__item--create",
    "sort-down"
  );
  $sortingTableHeadEdit.classList.add(
    "display-info__item",
    "display-info__item--change",
    "sort-down"
  );
  $sortingTableHeadContacts.classList.add(
    "display-info__item",
    "display-info__item--contacts"
  );
  $sortingTableHeadActions.classList.add(
    "display-info__item",
    "display-info__item--actions"
  );
  $sortingTableHeadSpan.classList.add("display-info__sorting");
  $wrapperTbody.classList.add("clients__tbody-wrapper");
  $tableBody.classList.add("clients__tbody");
  $addClientBtn.classList.add("clients__btn", "btn-reset");
  $addClientBtnSvg.classList.add("clients__svg");
  $createSpan.classList.add("create__span");
  $editSpan.classList.add("change__span");

  $sortingTableHeadId.id = "head-id";
  $sortingTableHeadName.id = "head-fullname";
  $sortingTableHeadCreate.id = "head-create";
  $sortingTableHeadEdit.id = "head-update";

  $title.textContent = "Клиенты";
  $sortingTableHeadId.textContent = "id";
  $sortingTableHeadName.textContent = "Фамилия Имя Отчество";
  $sortingTableHeadSpan.textContent = "а-я";
  $sortingTableHeadCreate.textContent = "Дата и время";
  $sortingTableHeadEdit.textContent = "Последние";
  $sortingTableHeadContacts.textContent = "Контакты";
  $sortingTableHeadActions.textContent = "Действия";
  $addClientBtn.textContent = "Добавить клиента";
  $addClientBtnSvg.innerHTML = svgAddClientsBtn;

  $addClientBtn.addEventListener("click", () => {
    document.body.append(createAddClientsModal());
  });

  $main.append($section);
  $section.append($container);
  $sortingTableHeadName.append($sortingTableHeadSpan);
  $sortingTableHeadCreate.append($createSpan);
  $sortingTableHeadEdit.append($editSpan);
  $theadTr.append(
    $sortingTableHeadId,
    $sortingTableHeadName,
    $sortingTableHeadCreate,
    $sortingTableHeadEdit,
    $sortingTableHeadContacts,
    $sortingTableHeadActions
  );
  $sortingTableHead.append($theadTr);
  $tableWrapper.append($clientsTable);
  $wrapperTbody.append($tableBody)
  $clientsTable.append($sortingTableHead, $wrapperTbody);
  $tableBody.append(createPreloader());
  $addClientBtn.prepend($addClientBtnSvg);
  $container.append($title, $tableWrapper, $addClientBtn);

  return {
    $main,
    $clientsTable,
    $tableBody,
  };
};
