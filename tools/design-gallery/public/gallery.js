/* global document, window, location, history, navigator, fetch, ResizeObserver, URLSearchParams, setTimeout, clearTimeout */

const STORAGE = {
  shortlist: "triage-design-wall:shortlist",
  notes: "triage-design-wall:notes",
  base: "triage-design-wall:base",
  state: "triage-design-wall:state",
};

const state = {
  modelId: null,
  routePath: "/",
  viewportId: "desktop",
  mode: "single",
};

let config = null;
let statusById = new Map();
let shortlist = readJson(STORAGE.shortlist, {});
let notes = readJson(STORAGE.notes, {});
let baseModel = window.localStorage.getItem(STORAGE.base) || null;
let statusTimer = null;
let toastTimer = null;
let compareBuilt = false;

const els = {
  modelList: document.querySelector("#model-list"),
  routeSwitch: document.querySelector("#route-switch"),
  viewportSwitch: document.querySelector("#viewport-switch"),
  modeSwitch: document.querySelector("#mode-switch"),
  topbarModel: document.querySelector("#topbar-model"),
  singleView: document.querySelector("#single-view"),
  compareView: document.querySelector("#compare-view"),
  compareGrid: document.querySelector("#compare-grid"),
  stage: document.querySelector("#stage"),
  frameSlot: document.querySelector("#frame-slot"),
  frameShell: document.querySelector("#frame-shell"),
  frame: document.querySelector("#frame"),
  stageOverlay: document.querySelector("#stage-overlay"),
  overlayDot: document.querySelector("#overlay-dot"),
  overlayMessage: document.querySelector("#overlay-message"),
  statuslineDot: document.querySelector("#statusline-dot"),
  statuslineText: document.querySelector("#statusline-text"),
  statuslineUrl: document.querySelector("#statusline-url"),
  reload: document.querySelector("#reload"),
  openTab: document.querySelector("#open-tab"),
  inspector: document.querySelector("#inspector"),
  copyShortlist: document.querySelector("#copy-shortlist"),
  clearShortlist: document.querySelector("#clear-shortlist"),
  toast: document.querySelector("#toast"),
};

function readJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in a locked-down browser.
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function getModel(modelId = state.modelId) {
  return config?.models.find((model) => model.id === modelId) || null;
}

function getRoute(path = state.routePath) {
  return (
    config?.routes.find((route) => route.path === path) ||
    config?.routes[0] ||
    null
  );
}

function getViewport(id = state.viewportId) {
  return (
    config?.viewports.find((viewport) => viewport.id === id) ||
    config?.viewports[0] ||
    null
  );
}

function getStatus(modelId = state.modelId) {
  return statusById.get(modelId) || null;
}

function modelUrl(model) {
  return `http://127.0.0.1:${model.port}`;
}

function saveState() {
  const persisted = {
    modelId: state.modelId,
    routePath: state.routePath,
    viewportId: state.viewportId,
    mode: state.mode,
  };
  writeJson(STORAGE.state, persisted);
  const params = new URLSearchParams();
  params.set("model", state.modelId);
  params.set("route", state.routePath);
  params.set("viewport", state.viewportId);
  params.set("mode", state.mode);
  history.replaceState(null, "", `#${params.toString()}`);
}

function readState() {
  const params = new URLSearchParams(location.hash.slice(1));
  const persisted = readJson(STORAGE.state, {});
  const modelId = params.get("model") || persisted.modelId;
  const routePath = params.get("route") || persisted.routePath;
  const viewportId = params.get("viewport") || persisted.viewportId;
  const mode = params.get("mode") || persisted.mode;

  if (config.models.some((model) => model.id === modelId)) {
    state.modelId = modelId;
  }

  if (config.routes.some((route) => route.path === routePath)) {
    state.routePath = routePath;
  }

  if (config.viewports.some((viewport) => viewport.id === viewportId)) {
    state.viewportId = viewportId;
  }

  if (mode === "compare" || mode === "single") {
    state.mode = mode;
  }
}

function renderModelList() {
  if (!config) return;

  els.modelList.innerHTML = config.models
    .map((model) => {
      const status = getStatus(model.id);
      const picked = (shortlist[model.id] || []).length;
      const isBase = baseModel === model.id;
      return `
        <button
          type="button"
          class="model-card"
          data-model-id="${escapeHtml(model.id)}"
          data-selected="${model.id === state.modelId}"
          title="${escapeHtml(model.summary)}"
        >
          <span class="model-card-head">
            <span
              class="status-dot"
              data-model-dot="${escapeHtml(model.id)}"
              data-status="${status?.status || "starting"}"
              aria-hidden="true"
            ></span>
            <span class="model-card-name">${escapeHtml(model.label)}</span>
            <span class="model-card-badges">
              ${isBase ? '<span class="base-badge">Base</span>' : ""}
              <span class="count-badge" data-model-count="${escapeHtml(model.id)}">${picked}</span>
            </span>
          </span>
          <span class="model-card-direction">${escapeHtml(model.direction)}</span>
        </button>
      `;
    })
    .join("");
}

function renderToolbar() {
  els.routeSwitch.innerHTML = config.routes
    .map(
      (route) => `
        <button
          type="button"
          data-route="${escapeHtml(route.path)}"
          aria-pressed="${route.path === state.routePath}"
        >${escapeHtml(route.label)}</button>
      `,
    )
    .join("");

  els.viewportSwitch.innerHTML = config.viewports
    .map(
      (viewport) => `
        <button
          type="button"
          data-viewport="${escapeHtml(viewport.id)}"
          aria-pressed="${viewport.id === state.viewportId}"
        >${escapeHtml(viewport.label)}</button>
      `,
    )
    .join("");
}

function renderMode() {
  els.singleView.hidden = state.mode !== "single";
  els.compareView.hidden = state.mode !== "compare";

  for (const button of els.modeSwitch.querySelectorAll("[data-mode]")) {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.mode === state.mode),
    );
  }

  if (state.mode === "compare") {
    buildCompareGrid();
    syncCompareCards();
    updateCompareScales();
    requestAnimationFrame(updateCompareScales);
  } else {
    requestAnimationFrame(layoutFrame);
  }
}

function renderTopbar() {
  const model = getModel();
  const route = getRoute();
  if (!model || !route) return;
  els.topbarModel.textContent = `${model.label} · ${route.label}`;
}

function renderInspector() {
  const model = getModel();
  if (!model) {
    els.inspector.innerHTML = "";
    return;
  }

  const status = getStatus(model.id);
  const picked = shortlist[model.id] || [];
  const note = notes[model.id] || "";

  els.inspector.innerHTML = `
    <div class="inspector-head">
      <span
        class="status-dot"
        id="inspector-status-dot"
        data-status="${status?.status || "starting"}"
        aria-hidden="true"
      ></span>
      <div class="inspector-title">
        <h2>${escapeHtml(model.label)}</h2>
        <p>${escapeHtml(model.branch)} · ${escapeHtml(model.tag)}</p>
      </div>
    </div>

    <section class="inspector-section">
      <h3 class="section-label">Direction</h3>
      <p class="inspector-copy">${escapeHtml(model.direction)}</p>
      <p class="inspector-copy">${escapeHtml(model.summary)}</p>
    </section>

    <section class="inspector-section">
      <h3 class="section-label">
        <span>Components</span>
        <span data-component-count>${picked.length} picked</span>
      </h3>
      <div class="component-list">
        ${model.components
          .map(
            (component) => `
              <label class="component-item">
                <input
                  type="checkbox"
                  data-component="${escapeHtml(component.name)}"
                  ${picked.includes(component.name) ? "checked" : ""}
                />
                <span class="component-copy">
                  <span class="component-name">${escapeHtml(component.name)}</span>
                  <span class="component-file">${escapeHtml(component.file)}</span>
                  <span class="component-note">${escapeHtml(component.note)}</span>
                </span>
              </label>
            `,
          )
          .join("")}
      </div>
    </section>

    <section class="inspector-section">
      <h3 class="section-label">Watch for</h3>
      <ul class="issues">
        ${model.knownIssues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join("")}
      </ul>
    </section>

    <section class="inspector-section">
      <h3 class="section-label">Your notes</h3>
      <textarea
        class="notes"
        id="model-notes"
        placeholder="What should we keep from ${escapeHtml(model.label)}?"
      >${escapeHtml(note)}</textarea>
    </section>

    <div class="inspector-actions">
      <button type="button" class="button" id="set-base">
        ${baseModel === model.id ? "Clear base" : "Set as base"}
      </button>
      <button type="button" class="button" id="copy-model">Copy this model</button>
    </div>
  `;

  const notesField = els.inspector.querySelector("#model-notes");
  notesField?.addEventListener("input", (event) => {
    notes = { ...notes, [model.id]: event.target.value };
    writeJson(STORAGE.notes, notes);
  });

  for (const checkbox of els.inspector.querySelectorAll("[data-component]")) {
    checkbox.addEventListener("change", (event) => {
      const name = event.target.dataset.component;
      const current = new Set(shortlist[model.id] || []);
      if (event.target.checked) current.add(name);
      else current.delete(name);
      shortlist = { ...shortlist, [model.id]: [...current] };
      writeJson(STORAGE.shortlist, shortlist);
      updatePickedCounts();
    });
  }

  els.inspector.querySelector("#set-base")?.addEventListener("click", () => {
    baseModel = baseModel === model.id ? null : model.id;
    if (baseModel) window.localStorage.setItem(STORAGE.base, baseModel);
    else window.localStorage.removeItem(STORAGE.base);
    renderModelList();
    renderInspector();
    toast(
      baseModel ? `${model.label} marked as the base.` : "Base model cleared.",
    );
  });

  els.inspector.querySelector("#copy-model")?.addEventListener("click", () => {
    const payload = {
      model: model.id,
      label: model.label,
      components: shortlist[model.id] || [],
      note: (notes[model.id] || "").trim(),
    };
    void copyText(JSON.stringify(payload, null, 2)).then((copied) =>
      toast(
        copied ? `${model.label} copied.` : "Could not access the clipboard.",
      ),
    );
  });
}

function updatePickedCounts() {
  for (const model of config.models) {
    const count = (shortlist[model.id] || []).length;
    const badge = els.modelList.querySelector(
      `[data-model-count="${model.id}"]`,
    );
    if (badge) badge.textContent = String(count);
  }

  const picked = (shortlist[state.modelId] || []).length;
  const countLabel = els.inspector.querySelector("[data-component-count]");
  if (countLabel) countLabel.textContent = `${picked} picked`;
}

function updateStatusBits() {
  for (const model of config.models) {
    const status = getStatus(model.id);
    const dot = els.modelList.querySelector(`[data-model-dot="${model.id}"]`);
    if (dot) dot.dataset.status = status?.status || "starting";
  }

  const status = getStatus();
  const inspectorDot = els.inspector.querySelector("#inspector-status-dot");
  if (inspectorDot) inspectorDot.dataset.status = status?.status || "starting";
}

function showOverlay(message, status) {
  if (!message) {
    els.stageOverlay.hidden = true;
    return;
  }

  els.stageOverlay.hidden = false;
  els.overlayMessage.textContent = message;
  els.overlayDot.dataset.status = status || "starting";
}

function syncFrame(force = false) {
  const model = getModel();
  const route = getRoute();
  if (!model || !route) return;

  const status = getStatus(model.id);
  const url = `${modelUrl(model)}${route.path}`;
  const isReady = status?.status === "ready";

  els.frame.title = `${model.label} — ${route.label}`;
  els.openTab.href = url;
  els.statuslineUrl.textContent = url;
  els.statuslineText.textContent = `${model.label} · ${status?.status || "starting"}`;
  els.statuslineDot.dataset.status = status?.status || "starting";

  if (isReady) {
    showOverlay(null);
    if (force || els.frame.dataset.url !== url) {
      els.frame.dataset.url = url;
      els.frame.src = url;
    }
    return;
  }

  if (status?.status === "error") {
    showOverlay(status.error || "This model server failed to start.", "error");
    return;
  }

  showOverlay(`Starting ${model.label}…`, "starting");
}

function layoutFrame() {
  if (!config || state.mode !== "single") return;

  const viewport = getViewport();
  if (!viewport) return;

  const availableWidth = Math.max(120, els.stage.clientWidth - 36);
  const availableHeight = Math.max(120, els.stage.clientHeight - 36);
  const scale = Math.max(
    0.1,
    Math.min(
      1,
      availableWidth / viewport.width,
      availableHeight / viewport.height,
    ),
  );

  els.frameShell.style.width = `${viewport.width}px`;
  els.frameShell.style.height = `${viewport.height}px`;
  els.frameShell.style.transform = `scale(${scale})`;
  els.frameSlot.style.width = `${Math.round(viewport.width * scale)}px`;
  els.frameSlot.style.height = `${Math.round(viewport.height * scale)}px`;
}

function buildCompareGrid() {
  if (compareBuilt || !config) return;
  compareBuilt = true;

  els.compareGrid.innerHTML = config.models
    .map(
      (model) => `
        <article class="compare-card" data-compare-card="${escapeHtml(model.id)}" data-selected="${model.id === state.modelId}">
          <header class="compare-card-head">
            <span
              class="status-dot"
              data-compare-dot="${escapeHtml(model.id)}"
              data-status="starting"
              aria-hidden="true"
            ></span>
            <strong>${escapeHtml(model.label)}</strong>
            <button type="button" class="button" data-focus-model="${escapeHtml(model.id)}">Focus</button>
          </header>
          <div class="compare-thumb" data-thumb="${escapeHtml(model.id)}">
            <div class="compare-placeholder" data-placeholder="${escapeHtml(model.id)}">
              <span class="status-dot" data-placeholder-dot="${escapeHtml(model.id)}" data-status="starting"></span>
              Starting…
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  for (const button of els.compareGrid.querySelectorAll("[data-focus-model]")) {
    button.addEventListener("click", () =>
      focusModel(button.dataset.focusModel),
    );
  }

  for (const thumb of els.compareGrid.querySelectorAll("[data-thumb]")) {
    thumb.addEventListener("click", () => focusModel(thumb.dataset.thumb));
  }
}

function syncCompareCards() {
  if (!compareBuilt || !config) return;

  for (const model of config.models) {
    const card = els.compareGrid.querySelector(
      `[data-compare-card="${model.id}"]`,
    );
    if (!card) continue;

    const status = getStatus(model.id);
    card.dataset.selected = String(model.id === state.modelId);

    const dot = card.querySelector(`[data-compare-dot="${model.id}"]`);
    if (dot) dot.dataset.status = status?.status || "starting";

    const thumb = card.querySelector(`[data-thumb="${model.id}"]`);
    if (!thumb) continue;

    const placeholder = thumb.querySelector(`[data-placeholder="${model.id}"]`);

    if (status?.status === "ready") {
      if (!thumb.querySelector("iframe")) {
        placeholder?.remove();
        const frame = document.createElement("iframe");
        frame.src = `${modelUrl(model)}/`;
        frame.title = `${model.label} landing page`;
        frame.loading = "lazy";
        frame.tabIndex = -1;
        thumb.append(frame);
        updateCompareScale(thumb);
      }
      continue;
    }

    if (status?.status === "error") {
      if (!thumb.querySelector("iframe")) {
        thumb.innerHTML = `
          <div class="compare-placeholder">
            <span class="status-dot" data-status="error"></span>
            Model server failed to start
          </div>
        `;
      }
      continue;
    }

    if (!placeholder && !thumb.querySelector("iframe")) {
      thumb.innerHTML = `
        <div class="compare-placeholder" data-placeholder="${escapeHtml(model.id)}">
          <span class="status-dot" data-status="starting"></span>
          Starting…
        </div>
      `;
    }
  }
}

function updateCompareScale(thumb) {
  const frame = thumb.querySelector("iframe");
  if (!frame) return;
  const scale = Math.max(0.05, thumb.clientWidth / 1440);
  frame.style.transform = `scale(${scale})`;
}

function updateCompareScales() {
  if (!compareBuilt) return;
  for (const thumb of els.compareGrid.querySelectorAll("[data-thumb]")) {
    updateCompareScale(thumb);
  }
}

function focusModel(modelId) {
  if (!config.models.some((model) => model.id === modelId)) return;
  state.modelId = modelId;
  state.mode = "single";
  saveState();
  renderModelList();
  renderToolbar();
  renderTopbar();
  renderInspector();
  renderMode();
  syncFrame();
}

function setRoute(path) {
  if (!config.routes.some((route) => route.path === path)) return;
  state.routePath = path;
  for (const button of els.routeSwitch.querySelectorAll("[data-route]")) {
    button.setAttribute("aria-pressed", String(button.dataset.route === path));
  }
  renderTopbar();
  saveState();
  syncFrame(true);
}

function setViewport(viewportId) {
  if (!config.viewports.some((viewport) => viewport.id === viewportId)) return;
  state.viewportId = viewportId;
  for (const button of els.viewportSwitch.querySelectorAll("[data-viewport]")) {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.viewport === viewportId),
    );
  }
  saveState();
  layoutFrame();
}

function setMode(mode) {
  if (mode !== "single" && mode !== "compare") return;
  state.mode = mode;
  saveState();
  renderMode();
}

async function refreshStatus() {
  try {
    const response = await fetch("/api/status", { cache: "no-store" });
    const data = await response.json();
    statusById = new Map(data.models.map((model) => [model.id, model]));
  } catch {
    statusById = new Map();
  }

  updateStatusBits();
  syncFrame();
  syncCompareCards();
  scheduleStatusPoll();
}

function scheduleStatusPoll() {
  clearTimeout(statusTimer);
  const anyStarting = config.models.some(
    (model) => getStatus(model.id)?.status !== "ready",
  );
  statusTimer = setTimeout(refreshStatus, anyStarting ? 1_200 : 8_000);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = text;
    fallback.style.position = "fixed";
    fallback.style.opacity = "0";
    document.body.append(fallback);
    fallback.select();
    const copied = document.execCommand("copy");
    fallback.remove();
    return copied;
  }
}

function toast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.dataset.visible = "true";
  toastTimer = setTimeout(() => {
    els.toast.dataset.visible = "false";
  }, 2_600);
}

function copyShortlist() {
  const selections = config.models
    .map((model) => ({
      model: model.id,
      label: model.label,
      components: shortlist[model.id] || [],
      note: (notes[model.id] || "").trim(),
    }))
    .filter(
      (selection) =>
        selection.components.length > 0 || selection.note.length > 0,
    );

  if (!baseModel && selections.length === 0) {
    toast("Pick a base or at least one component first.");
    return;
  }

  const payload = {
    generatedBy: "Triage design wall",
    base: baseModel,
    selections,
  };

  void copyText(JSON.stringify(payload, null, 2)).then((copied) => {
    toast(
      copied ? "Shortlist copied as JSON." : "Could not access the clipboard.",
    );
  });
}

function clearPicks() {
  const confirmed = window.confirm(
    "Clear the base, component picks, and notes for every model?",
  );
  if (!confirmed) return;

  shortlist = {};
  notes = {};
  baseModel = null;
  writeJson(STORAGE.shortlist, shortlist);
  writeJson(STORAGE.notes, notes);
  window.localStorage.removeItem(STORAGE.base);
  renderModelList();
  renderInspector();
  toast("Picks cleared.");
}

function handleHashChange() {
  readState();
  renderModelList();
  renderToolbar();
  renderTopbar();
  renderInspector();
  renderMode();
  syncFrame();
}

els.modelList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-model-id]");
  if (!card) return;
  focusModel(card.dataset.modelId);
});

els.routeSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("[data-route]");
  if (button) setRoute(button.dataset.route);
});

els.viewportSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("[data-viewport]");
  if (button) setViewport(button.dataset.viewport);
});

els.modeSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (button) setMode(button.dataset.mode);
});

els.reload.addEventListener("click", () => syncFrame(true));
els.copyShortlist.addEventListener("click", copyShortlist);
els.clearShortlist.addEventListener("click", clearPicks);
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("resize", () => {
  layoutFrame();
  updateCompareScales();
});

async function init() {
  try {
    const response = await fetch("/api/config", { cache: "no-store" });
    config = await response.json();
  } catch {
    document.body.innerHTML =
      '<p style="padding:24px;font-family:sans-serif;color:#e9ecf3">The design wall server is not running.</p>';
    return;
  }

  readState();
  if (!state.modelId) state.modelId = config.models.at(-1)?.id || null;

  renderModelList();
  renderToolbar();
  renderTopbar();
  renderInspector();
  renderMode();
  syncFrame();

  new ResizeObserver(() => {
    layoutFrame();
    updateCompareScales();
  }).observe(els.stage);

  await refreshStatus();
}

void init();
