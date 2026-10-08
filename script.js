"use strict";

/* ================================================================
   TSV Wittenau Herren – zentral gepflegte Beispieldaten
   Alle Inhalte in diesem Block können später einfach ersetzt werden.
   ================================================================ */

// Datenstand: 08.10.2026
// Quelle: offizielle Mannschaftsseite auf FUSSBALL.DE (Saison 2026/27)
const teamPageUrl =
  "https://www.fussball.de/mannschaft/tsv-berlin-wittenau-tsv-wittenau-berlin/-/saison/2627/team-id/03198303VC000000VS5489BSVU0ORN69";

const nextMatch = {
  competition: "Herren Kreisliga C · Staffel 3",
  date: "2026-10-11",
  dateLabel: "Sonntag, 11. Oktober 2026",
  time: "10:00",
  homeTeam: {
    name: "SC Union 06 III",
    shortName: "SCU",
  },
  awayTeam: {
    name: "TSV Berlin-Wittenau",
    shortName: "TSV",
  },
  type: "Auswärtsspiel",
  venue: {
    name: "Poststadion KR4 (Jana-Lange-Platz)",
    street: "Lehrter Straße 59",
    city: "10557 Berlin",
    mapUrl:
      "https://www.openstreetmap.org/search?query=Lehrter%20Stra%C3%9Fe%2059%2C%2010557%20Berlin",
  },
  detailsUrl:
    "https://www.fussball.de/spiel/sc-union-06-iii-tsv-berlin-wittenau/-/spiel/031G0G11GS000000VS5489BTVVG7L386",
};

const recentMatches = [
  {
    date: "2026-09-27",
    dateLabel: "27.09.2026",
    competition: "Kreisliga C",
    homeTeam: "SC Westend 01 II",
    awayTeam: "TSV Berlin-Wittenau",
    score: "3 : 2",
    outcome: "Niederlage",
  },
  {
    date: "2026-09-13",
    dateLabel: "13.09.2026",
    competition: "Kreisliga C",
    homeTeam: "FC Internationale Berlin IV",
    awayTeam: "TSV Berlin-Wittenau",
    score: "3 : 6",
    outcome: "Sieg",
  },
  {
    date: "2026-08-30",
    dateLabel: "30.08.2026",
    competition: "Kreisliga C",
    homeTeam: "TSV Berlin-Wittenau",
    awayTeam: "Steglitz GB",
    score: "6 : 2",
    outcome: "Sieg",
  },
  {
    date: "2026-08-18",
    dateLabel: "18.08.2026",
    competition: "Berlin-Pokal",
    homeTeam: "Cono Sur Berlin",
    awayTeam: "TSV Berlin-Wittenau",
    score: "1 : 0",
    outcome: "Niederlage",
  },
  {
    date: "2026-08-16",
    dateLabel: "16.08.2026",
    competition: "Kreisliga C",
    homeTeam: "Lichtenrader BC III",
    awayTeam: "TSV Berlin-Wittenau",
    score: "1 : 6",
    outcome: "Sieg",
  },
];

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

function renderNextMatch() {
  const target = document.querySelector("#next-match-content");
  if (!target) return;

  const match = nextMatch;
  target.innerHTML = `
    <article class="match-facts" aria-label="${escapeHtml(match.homeTeam.name)} gegen ${escapeHtml(match.awayTeam.name)}">
      <div class="match-fact">
        <p class="match-label">Uhrzeit</p>
        <div class="match-value">
          <p><time datetime="${escapeHtml(match.date)}">${escapeHtml(match.dateLabel)}</time></p>
          <p><time datetime="${escapeHtml(match.date)}T${escapeHtml(match.time)}">${escapeHtml(match.time)} Uhr</time></p>
        </div>
      </div>
      <div class="match-fact">
        <p class="match-label">Begegnung</p>
        <div class="match-value match-teams-editorial">
          <p>${escapeHtml(match.homeTeam.name)}</p>
          <p class="match-secondary">gegen</p>
          <p>${escapeHtml(match.awayTeam.name)}</p>
        </div>
      </div>
      <div class="match-fact">
        <p class="match-label">Spielort</p>
        <div class="match-value">
          <p>${escapeHtml(match.venue.name)}</p>
          <address>${escapeHtml(match.venue.street)}<br>${escapeHtml(match.venue.city)}</address>
          <div class="match-links">
            <a href="${escapeHtml(match.venue.mapUrl)}" target="_blank" rel="noopener noreferrer">Route öffnen<span class="visually-hidden"> (öffnet in neuem Tab)</span></a>
            <a href="${escapeHtml(match.detailsUrl)}" target="_blank" rel="noopener noreferrer">Spieldetails<span class="visually-hidden"> (öffnet in neuem Tab)</span></a>
          </div>
        </div>
      </div>
    </article>`;
}

function renderRecentMatches() {
  const target = document.querySelector("#recent-matches");
  if (!target) return;

  target.innerHTML = recentMatches
    .map((match) => {
      const outcomeClass =
        {
          Sieg: "outcome-win",
          Unentschieden: "outcome-draw",
          Niederlage: "outcome-loss",
        }[match.outcome] || "";

      return `
      <article class="result-row">
        <div class="result-meta">
          <time datetime="${escapeHtml(match.date)}">${escapeHtml(match.dateLabel)}</time>
          <span>${escapeHtml(match.competition)}</span>
        </div>
        <div class="result-fixture">
          <div class="result-teams">
            <span>${escapeHtml(match.homeTeam)}</span>
            <span>${escapeHtml(match.awayTeam)}</span>
          </div>
          <strong class="score" aria-label="Ergebnis ${escapeHtml(match.score.replace(":", "zu"))}">${escapeHtml(match.score)}</strong>
        </div>
        <span class="outcome ${outcomeClass}">${escapeHtml(match.outcome)}</span>
      </article>`;
    })
    .join("");
}

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
      "#ergebnisse .section-heading",
      "#ergebnisse .results-list",
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

/**
 * Identifiziert den eingebetteten YouTube-Player mit der aktuellen Seiten-Origin.
 * Das verhindert Player-Fehler 153 in Browsern, die den HTTP-Referrer begrenzen.
 */
function setupYouTubeEmbed() {
  const player = document.querySelector("[data-youtube-video]");
  if (!player) return;

  const videoId = player.dataset.youtubeVideo;
  const isWebOrigin = ["http:", "https:"].includes(window.location.protocol);
  const pageOrigin = isWebOrigin
    ? window.location.origin
    : "http://127.0.0.1:4173";
  const parameters = new URLSearchParams({
    origin: pageOrigin,
    rel: "0",
  });

  if (isWebOrigin) parameters.set("widget_referrer", window.location.href);

  player.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${parameters.toString()}`;
}

document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const lenis = setupSmoothScrolling();
  setupNavigation();
  setupYouTubeEmbed();
  renderNextMatch();
  renderRecentMatches();
  renderPlayers();
  setupHeadlineAnimation();

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Browser und Hash-Sprung legen zuerst die endgültige Einstiegslage fest.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => setupScrollAnimations(lenis));
  });
});
