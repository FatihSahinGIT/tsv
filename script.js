"use strict";

/* Zentral gepflegte Kaderdaten. */

const players = [
  { name: "Hendrik Pieterse", number: 1, photo: "" },
  { name: "Shiyam Sivaharan", number: 2, photo: "" },
  { name: "Saathurijan Sathiskumar", number: 4, photo: "" },
  { name: "Ali Yesil", number: 5, photo: "" },
  { name: "Davut Emre Akkus", number: 6, photo: "" },
  { name: "Andreas Karp", number: 7, photo: "" },
  { name: "Govinda Gutierrez Sierra", number: 8, photo: "" },
  { name: "Onurcan Yilmaz", number: 9, photo: "" },
  { name: "Ugur Ok", number: 10, photo: "" },
  { name: "Enes Cakiroglu", number: 11, photo: "" },
  { name: "Nilavan Thavaparan", number: 13, photo: "" },
  { name: "Pirinthan Sivaharan", number: 14, photo: "" },
  { name: "Fatih Sahin", number: 17, photo: "" },
  { name: "Emrullah Cakiroglu", number: 20, photo: "" },
  { name: "Oskar Steinkötter", number: 21, photo: "" },
  { name: "Anthony Römer", number: 22, photo: "" },
  { name: "Aron Caragiuli", number: 23, photo: "" },
  { name: "Nischanth Selvakumar", number: 29, photo: "" },
  { name: "Fritz Hansen", number: 33, photo: "" },
  { name: "Kerthanan Satkurunathan", number: 45, photo: "" },
  { name: "Veli Kocadag", number: 49, photo: "" },
  { name: "Kavitharan", number: 97, photo: "" },
];

/* Neutrales, eingebettetes Ersatzmotiv – verursacht keine zusätzlichen Dateianfragen. */
const playerPlaceholder = (name) => {
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" role="img">
    <rect width="600" height="750" fill="#deded9"/>
    <circle cx="300" cy="255" r="105" fill="#a9a9a3"/>
    <path d="M105 750c12-190 82-292 195-292s183 102 195 292" fill="#a9a9a3"/>
    <text x="300" y="690" text-anchor="middle" fill="#5c5c58" font-family="Arial, sans-serif" font-size="52" font-weight="700">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function renderPlayers() {
  const target = document.querySelector("#players-grid");
  if (!target) return;

  target.innerHTML = players
    .map((player) => {
      const photo = player.photo || playerPlaceholder(player.name);
      const alt = player.photo
        ? `${player.name} beim TSV Wittenau`
        : `Neutrales Platzhalterbild für ${player.name}`;

      return `
      <article class="player-card">
        <div class="player-image-wrap">
          <img class="player-image" src="${escapeHtml(photo)}" alt="${escapeHtml(alt)}" width="600" height="750" loading="lazy">
        </div>
        <div class="player-info">
          <span class="player-number" aria-label="Rückennummer ${escapeHtml(player.number)}">${escapeHtml(player.number)}</span>
          <h3 class="player-name">${escapeHtml(player.name)}</h3>
        </div>
      </article>`;
    })
    .join("");
}

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector("#hauptnavigation");
  if (!toggle || !navigation) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    toggle.querySelector(".nav-toggle-label").textContent = "Menü";
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
    toggle.querySelector(".nav-toggle-label").textContent = isOpen
      ? "Menü"
      : "Schließen";
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 48rem)").matches) closeMenu();
  });
}

/**
 * Aktiviert sanftes Scrollen als progressive Verbesserung.
 * Ohne geladene CDN-Bibliothek bleibt das native Scrollverhalten erhalten.
 * Lenis respektiert prefers-reduced-motion automatisch.
 */
function setupSmoothScrolling() {
  if (typeof window.Lenis !== "function") return null;

  return new window.Lenis({
    autoRaf: true,
    smoothWheel: true,
    syncTouch: false,
    lerp: 0.085,
    wheelMultiplier: 0.9,
    anchors: true,
    stopInertiaOnNavigate: true,
    respectReducedMotion: true,
  });
}

/** Kleine Einstiegsanimation nur für die Hauptheadline. */
function setupHeadlineAnimation() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const headline = document.querySelector(".hero h1");

  if (reduceMotion || !headline || typeof window.gsap === "undefined") return;

  window.gsap.fromTo(
    headline,
    { autoAlpha: 0, y: 10 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.62,
      ease: "power2.out",
      clearProps: "transform,opacity,visibility",
    },
  );
}

/**
 * Kleine, einmalige Einblendungen beim Scrollen.
 * Ohne GSAP oder bei reduzierter Bewegung bleiben alle Inhalte sofort sichtbar.
 */
function setupScrollAnimations(lenis) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (
    reduceMotion ||
    typeof window.gsap === "undefined" ||
    typeof window.ScrollTrigger === "undefined"
  )
    return;

  window.gsap.registerPlugin(window.ScrollTrigger);

  if (lenis) lenis.on("scroll", window.ScrollTrigger.update);

  const revealTargets = window.gsap.utils.toArray(
    [
      ".next-match-layout",
      ".table-widget-layout",
      "#ergebnisse .section-heading",
      "#ergebnisse .football-widget-shell",
      ".highlights-intro-grid",
      ".highlight-video",
      ".highlight-details",
      ".story-image",
      ".story-copy",
      "#mannschaft .section-heading",
      ".players-grid",
      ".sponsor-layout",
      ".footer-grid",
    ].join(","),
  );

  revealTargets.forEach((element) => {
    const initialPosition = element.getBoundingClientRect();

    // Bereits erreichte oder sichtbare Bereiche bleiben beim Einstieg stabil.
    if (initialPosition.top < window.innerHeight * 0.9) return;

    window.gsap.fromTo(
      element,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        ease: "power2.out",
        clearProps: "transform,opacity,visibility",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      },
    );
  });

  window.ScrollTrigger.refresh();
}

document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const lenis = setupSmoothScrolling();
  setupNavigation();
  renderPlayers();
  setupHeadlineAnimation();

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Browser und Hash-Sprung legen zuerst die endgültige Einstiegslage fest.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => setupScrollAnimations(lenis));
  });
});
