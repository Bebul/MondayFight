const mondayFightMenuItems = [
  ["index.html", "Main page"],
  ["actualities.html", "Hot News"],
  ["hallOfFame.html", "Síň slávy ♕"],
  ["chessboard.html", "Krotitelé šachovnic"],
  ["tables.html", "Leaderboards"],
  ["cross.html", "Cross table"],
  ["openings.html", "Openings table"],
  ["search.html", "Search Engine"],
  ["archiv2020.html", "Archiv 2020"],
  ["archiv2021.html", "Archiv 2021"],
  ["archiv2022.html", "Archiv 2022"],
  ["archiv2023.html", "Archiv 2023"],
  ["archiv2024.html", "Archiv 2024"],
  ["archiv2025.html", "Archiv 2025"],
  ["cards.html", "Duel Cards"],
  ["players.html", "Players"],
];

function isCurrentPage(href) {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  return href === currentPath;
}

function initializeMondayFightMenu() {
  const menu = document.querySelector("[data-mf-menu]");
  const toggle = document.querySelector("[data-mf-menu-toggle]");

  if (!menu || !toggle) return;

  for (const [href, label] of mondayFightMenuItems) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    if (isCurrentPage(href)) link.setAttribute("aria-current", "page");
    menu.append(link);
  }

  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.hidden;
    menu.hidden = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  window.addEventListener("scroll", closeMenu, { passive: true });
}

document.addEventListener("DOMContentLoaded", initializeMondayFightMenu);
