(() => {
  const appStoreUrl = "";
  const storeTargets = document.querySelectorAll("[data-app-store]");
  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector("#mobile-menu");

  const validAppStoreUrl = (() => {
    if (!appStoreUrl) return null;
    try {
      const url = new URL(appStoreUrl);
      return url.protocol === "https:" && url.hostname === "apps.apple.com" ? url.href : null;
    } catch {
      return null;
    }
  })();

  storeTargets.forEach((target) => {
    if (!validAppStoreUrl) return;
    const link = document.createElement("a");
    link.className = target.className;
    link.href = validAppStoreUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "App Storeでダウンロード";
    target.replaceWith(link);
  });

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.hidden = expanded;
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      });
    });
  }
})();
