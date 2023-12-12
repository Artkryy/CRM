import { svgPreloader } from "./svg.js";

export const createPreloader = () => {
  const $preloaderBlock = document.createElement("div"),
    $preloaderCircle = document.createElement("span");

  $preloaderBlock.classList.add("preloader");
  $preloaderCircle.id = "loader";

  $preloaderCircle.innerHTML = svgPreloader;

  $preloaderBlock.append($preloaderCircle);

  return $preloaderBlock;
};
