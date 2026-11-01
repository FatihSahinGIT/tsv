"use strict";

(() => {
  const STORAGE_KEY = "tsv-wittenau-consent-v1";
  const EMPTY_CONSENT = Object.freeze({
    version: 1,
    fussball: false,
    youtube: false,
  });

  const readConsent = () => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return { ...EMPTY_CONSENT };

      const parsed = JSON.parse(saved);
      return {
        version: 1,
        fussball: parsed.fussball === true,
        youtube: parsed.youtube === true,
        savedAt: parsed.savedAt || null,
      };
    } catch {
      return { ...EMPTY_CONSENT };
    }
  };

  const hasSavedConsent = () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      return false;
    }
  };

  const persistConsent = (selection) => {
    const value = {
      version: 1,
      fussball: selection.fussball === true,
      youtube: selection.youtube === true,
      savedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Die Seite bleibt auch nutzbar, wenn der Browser lokalen Speicher blockiert.
    }

    return value;
  };

  let consent = readConsent();

  const updateStatusLabels = () => {
    document.querySelectorAll("[data-consent-status]").forEach((element) => {
      const service = element.dataset.consentStatus;
      element.textContent = consent[service] ? "Erlaubt" : "Nicht erlaubt";
      element.classList.toggle("is-active", consent[service] === true);
    });
  };

  const loadFussballWidgets = () => {
    const placeholders = document.querySelectorAll(
      '[data-external-service="fussball"]',
    );
    if (!placeholders.length) return;

    placeholders.forEach((placeholder) => {
      if (placeholder.classList.contains("is-loaded")) return;

      const widget = document.createElement("div");
      widget.className = "fussballde_widget football-widget";
      widget.dataset.id = placeholder.dataset.widgetId;
      widget.dataset.type = placeholder.dataset.widgetType;
      widget.style.width = "100%";

      placeholder.replaceChildren(widget);
      placeholder.classList.add("is-loaded");
    });

    if (document.querySelector('script[data-fussballde-widgets="true"]')) return;

    const script = document.createElement("script");
    script.src = "https://www.fussball.de/widgets.js";
    script.async = true;
    script.dataset.fussballdeWidgets = "true";
    script.addEventListener("load", () => {
      requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    });

    // Das Widget liest beim Start die aktuelle Containerbreite aus. Zwei
    // Layout-Frames verhindern, dass dabei die schmale Standardbreite greift.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => document.head.appendChild(script));
    });
  };

  const loadYouTubeVideo = () => {
    const placeholder = document.querySelector(
      '[data-external-service="youtube"][data-youtube-video]',
    );
    if (!placeholder || placeholder.classList.contains("is-loaded")) return;

    const videoId = placeholder.dataset.youtubeVideo;
    const isWebOrigin = ["http:", "https:"].includes(window.location.protocol);
    const pageOrigin = isWebOrigin
      ? window.location.origin
      : "http://127.0.0.1:4173";
    const parameters = new URLSearchParams({
      origin: pageOrigin,
      rel: "0",
    });

    if (isWebOrigin) parameters.set("widget_referrer", window.location.href);

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${parameters.toString()}`;
    iframe.title = "Internationale gegen TSV Wittenau auf YouTube";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";

    placeholder.replaceChildren(iframe);
    placeholder.classList.add("is-loaded");
  };

  const applyConsent = () => {
    if (consent.fussball) loadFussballWidgets();
    if (consent.youtube) loadYouTubeVideo();
    updateStatusLabels();
  };

  const panel = document.querySelector("[data-consent-panel]");
  const choices = {
    fussball: document.querySelector('[data-consent-choice="fussball"]'),
    youtube: document.querySelector('[data-consent-choice="youtube"]'),
  };

  const syncPanel = () => {
    if (choices.fussball) choices.fussball.checked = consent.fussball;
    if (choices.youtube) choices.youtube.checked = consent.youtube;
  };

  const showPanel = () => {
    if (!panel) return;
    syncPanel();
    panel.hidden = false;
    panel.querySelector("h2")?.focus({ preventScroll: true });
  };

  const hidePanel = () => {
    if (panel) panel.hidden = true;
  };

  const commitConsent = (nextConsent) => {
    const requiresReload =
      (consent.fussball && !nextConsent.fussball) ||
      (consent.youtube && !nextConsent.youtube);

    consent = persistConsent(nextConsent);
    syncPanel();
    updateStatusLabels();
    hidePanel();

    if (requiresReload) {
      window.location.reload();
      return;
    }

    applyConsent();
  };

  document.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-consent-open]");
    if (openButton) {
      showPanel();
      return;
    }

    const enableButton = event.target.closest("[data-consent-enable]");
    if (enableButton) {
      commitConsent({
        ...consent,
        [enableButton.dataset.consentEnable]: true,
      });
      return;
    }

    if (event.target.closest("[data-consent-all]")) {
      commitConsent({ fussball: true, youtube: true });
      return;
    }

    if (event.target.closest("[data-consent-reject]")) {
      commitConsent({ fussball: false, youtube: false });
      return;
    }

    if (event.target.closest("[data-consent-save]")) {
      commitConsent({
        fussball: choices.fussball?.checked === true,
        youtube: choices.youtube?.checked === true,
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel && !panel.hidden && hasSavedConsent()) {
      hidePanel();
    }
  });

  applyConsent();
  if (!hasSavedConsent()) showPanel();
})();
