const mondayFightMenuItems = [
  { href: "index.html", label: "Main page" },
  { href: "actualities.html", label: "Hot News" },
  { href: "hallOfFame.html", label: "Síň slávy ♕" },
  { href: "chessboard.html", label: "Krotitelé šachovnic" },
  { href: "tables.html", label: "Leaderboards" },
  { href: "cross.html", label: "Cross table" },
  { href: "openings.html", label: "Openings table" },
  { href: "search.html", label: "Search Engine" },
  {
    label: "Archives",
    children: [
      { href: "archiv2020.html", label: "Archiv 2020" },
      { href: "archiv2021.html", label: "Archiv 2021" },
      { href: "archiv2022.html", label: "Archiv 2022" },
      { href: "archiv2023.html", label: "Archiv 2023" },
      { href: "archiv2024.html", label: "Archiv 2024" },
      { href: "archiv2025.html", label: "Archiv 2025" },
    ],
  },
  { href: "cards.html", label: "Duel Cards" },
  { href: "players.html", label: "Players" },
];

function isCurrentPage(href) {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  return href === currentPath;
}

function containsCurrentPage(items) {
  return items.some(
    (item) =>
      (item.href && isCurrentPage(item.href)) ||
      (item.children && containsCurrentPage(item.children)),
  );
}

function createMenuItem(item) {
  if (!item.children) {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    if (isCurrentPage(item.href)) link.setAttribute("aria-current", "page");
    return link;
  }

  const group = document.createElement("details");
  group.className = "mf-menu-group";
  group.open = containsCurrentPage(item.children);

  const summary = document.createElement("summary");
  summary.textContent = item.label;
  group.append(summary);

  const submenu = document.createElement("div");
  submenu.className = "mf-menu-submenu";
  for (const child of item.children) submenu.append(createMenuItem(child));
  group.append(submenu);

  return group;
}

function initializeMondayFightMenu() {
  const menu = document.querySelector("[data-mf-menu]");
  const toggle = document.querySelector("[data-mf-menu-toggle]");

  if (!menu || !toggle) return;

  for (const item of mondayFightMenuItems) menu.append(createMenuItem(item));

  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    menu.querySelectorAll("details[open]").forEach((group) => {
      group.open = false;
    });
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.hidden;
    menu.hidden = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  window.addEventListener("scroll", closeMenu, { passive: true });
}

document.addEventListener("DOMContentLoaded", initializeMondayFightMenu);
