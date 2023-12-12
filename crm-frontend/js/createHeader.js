// Создание Header
export const createHeader = () => {
  const $header = document.createElement("header"),
    $container = document.createElement("div"),
    $headerWrapper = document.createElement("div"),
    $headerWrapLogo = document.createElement("a"),
    $headerLogo = document.createElement("img"),
    $headerForm = document.createElement("form"),
    $headerSearch = document.createElement("input"),
    $headerInner = document.createElement('div'),
    $findList = document.createElement('ul');

  $header.classList.add("header");
  $container.classList.add("container", "header__container");
  $headerWrapper.classList.add("header__wrapper");
  $headerWrapLogo.classList.add("header__wrap-logo");
  $headerLogo.classList.add("header__logo");
  $headerForm.classList.add("header__form");
  $headerSearch.classList.add("header__search");
  $headerInner.classList.add('header__inner');
  $findList.classList.add('header__find-list', 'invisible')

  $headerLogo.src = "./img/header-logo.svg";
  $headerLogo.alt = "Логотип";
  $headerSearch.placeholder = "Введите запрос";

  $headerInner.append($headerSearch, $findList)
  $header.append($container);
  $headerWrapLogo.append($headerLogo);
  $headerForm.append($headerInner);
  $container.append($headerWrapLogo, $headerForm)

  return $header;
}
