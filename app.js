(() => {
  "use strict";

  const STORAGE_KEY = "lernprofil-coach-v0.2.0";
  const LEGACY_KEYS = ["lernprofil-coach-v0.1.1", "lernprofil-coach-v1"];
  const app = document.querySelector("#app");
  const network = document.querySelector("#network");
  const config = window.EXPERIMENT_CONFIG;
  const units = window.EXPERIMENT_UNITS;
  const isTestMode = new URLSearchParams(window.location.search).get("testmodus") === "1";

  const baseState = {
    version: config.version,
    participant: { name: "", age: "", parentPin: "" },
    demo: { completedAt: null, score: null },
    units: {},
    active: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  let state = loadState();
  let view = "home";
  let timerId = null;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function freshUnitState() {
    return {
      status: "not_started",
      topicVariant: "primary",
      context: { energy: null, mood: null, focus: null },
      pretests: {},
      learning: { startedAt: null, completedAt: null },
      immediate: emptyTestState(),
      delayed: emptyTestState(),
      delayedAvailableAt: null,
      invalidReason: null
    };
  }

  function emptyTestState() {
    return {
      recallChecks: [],
      understandingScores: [],
      sequenceOrder: [],
      transferAnswers: {},
      ratings: { effort: null, interest: null, confidence: null, repeat: null },
      score: null,
      completedAt: null
    };
  }

  function ensureShape(raw) {
    const next = {
      ...clone(baseState),
      ...raw,
      participant: { ...baseState.participant, ...(raw.participant || {}) },
      demo: { ...baseState.demo, ...(raw.demo || {}) },
      units: { ...(raw.units || {}) }
    };
    next.version = config.version;
    next.updatedAt = new Date().toISOString();
    return next;
  }

  function loadState() {
    try {
      const own = localStorage.getItem(STORAGE_KEY);
      if (own) return ensureShape(JSON.parse(own));

      for (const key of LEGACY_KEYS) {
        const legacy = localStorage.getItem(key);
        if (!legacy) continue;
        const parsed = JSON.parse(legacy);
        const migrated = clone(baseState);
        migrated.participant.name = parsed.participant?.name || "";
        migrated.participant.age = parsed.participant?.age || "";
        migrated.demo.completedAt = parsed.demo?.completedAt || null;
        migrated.demo.score = parsed.demo?.score ?? null;
        return ensureShape(migrated);
      }
    } catch (error) {
      console.warn("Lokale Daten konnten nicht gelesen werden.", error);
    }
    return clone(baseState);
  }

  function saveState() {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function go(nextView) {
    stopTimer();
    view = nextView;
    window.scrollTo({ top: 0, behavior: "smooth" });
    render();
    app.focus({ preventScroll: true });
  }

  function getUnitState(unitId) {
    if (!state.units[unitId]) state.units[unitId] = freshUnitState();
    return state.units[unitId];
  }

  function getActiveUnit() {
    if (!state.active?.unitId) return null;
    return units[state.active.unitId] || null;
  }

  function getTopic(unitId, variant = null) {
    const unit = units[unitId];
    if (!unit) return null;
    const unitState = getUnitState(unitId);
    return unit[variant || unitState.topicVariant];
  }

  function delayMilliseconds() {
    if (isTestMode) return config.testModeDelayMinutes * 60 * 1000;
    return config.delayedHours * 60 * 60 * 1000;
  }

  function unitProgress(unitState) {
    if (unitState.status === "complete") return 100;
    if (unitState.status === "waiting_delayed") return 75;
    if (unitState.immediate.completedAt) return 75;
    if (unitState.learning.completedAt) return 45;
    if (unitState.status === "in_progress") return 20;
    return 0;
  }

  function overallProgress() {
    const total = 8;
    let complete = 0;
    for (let i = 1; i <= total; i += 1) {
      const unit = state.units[`unit-${i}`];
      if (unit?.status === "complete") complete += 1;
    }
    return Math.round((complete / total) * 100);
  }

  function render() {
    if (view === "profile") return renderProfile();
    if (view === "demo") return renderDemo();
    if (view === "unit") return renderActiveUnit();
    if (view === "parent") return renderParentArea();
    return renderHome();
  }

  function renderHome() {
    const name = state.participant.name.trim();
    const participantReady = Boolean(name);
    const pinReady = /^\d{4}$/.test(state.participant.parentPin);
    const experimentReady = participantReady && pinReady;
    const unit1 = getUnitState("unit-1");
    const rows = window.LEARNING_MODULES.map(module => renderModuleRow(module, experimentReady)).join("");

    app.innerHTML = `
      ${isTestMode ? `
        <div class="warning-banner">
          <strong>Testmodus aktiv:</strong> Der Erinnerungstest wird schon nach ${config.testModeDelayMinutes} Minuten freigeschaltet. Ergebnisse nicht als Lernprofil verwenden.
        </div>
      ` : ""}

      <section class="hero">
        <p class="eyebrow">Lernprofil-Experiment</p>
        <h1>${name ? `Hallo ${esc(name)}.` : "Finde heraus, wie Lernen wirklich hängen bleibt."}</h1>
        <p>
          Acht voneinander unabhängige Lerneinheiten prüfen Aufnahme, Verständnis,
          Übertragung und Erinnerung. Die Lernbedingungen und Zwischenstände bleiben verborgen.
        </p>
        <div class="actions">
          <button class="btn btn-primary" id="profileButton">${participantReady ? "Profil bearbeiten" : "Profil anlegen"}</button>
          <button class="btn btn-light" id="parentButton">${pinReady ? "Elternbereich" : "Elternbereich einrichten"}</button>
        </div>
      </section>

      ${!participantReady ? `
        <section class="section notice">
          Vor dem ersten echten Lernversuch bitte das Teilnehmerprofil anlegen. Die Eltern-PIN wird getrennt im Elternbereich festgelegt.
        </section>
      ` : !pinReady ? `
        <section class="section notice">
          Das Teilnehmerprofil ist vollständig. Bitte jetzt im Elternbereich eine vierstellige PIN festlegen.
        </section>
      ` : ""}

      <section class="section grid grid-3">
        <article class="card metric">
          <span>Gesamtfortschritt</span>
          <strong>${overallProgress()} %</strong>
          <div class="progress"><span style="width:${overallProgress()}%"></span></div>
        </article>
        <article class="card metric">
          <span>Unabhängige Einheiten</span>
          <strong>8</strong>
          <span>Jedes Thema wird nur einmal verwendet.</span>
        </article>
        <article class="card metric">
          <span>Erinnerungstest</span>
          <strong>${isTestMode ? `${config.testModeDelayMinutes} Min.` : `${config.delayedHours} Std.`}</strong>
          <span>Erst danach wird die Einheit abgeschlossen.</span>
        </article>
      </section>

      <section class="section card">
        <div class="page-header">
          <div>
            <p class="eyebrow dark">Versuchsplan</p>
            <h2>Einheiten</h2>
          </div>
          <button class="btn btn-ghost" id="exportButton">Sicherung exportieren</button>
        </div>
        <div class="module-list">${rows}</div>
      </section>

      <section class="section card compact-card">
        <h2>Warum die Einheiten getrennt bleiben</h2>
        <p>
          Jede Einheit nutzt ein eigenes Thema und einen eigenen Datensatz. Die nächste neue
          Lernphase wird erst nach dem Erinnerungstest der vorherigen Einheit freigegeben.
          So kann Wissen aus einer Einheit das nächste Thema möglichst wenig beeinflussen.
        </p>
      </section>
    `;

    document.querySelector("#profileButton").addEventListener("click", () => go("profile"));
    document.querySelector("#parentButton").addEventListener("click", () => go("parent"));
    document.querySelector("#exportButton").addEventListener("click", exportData);
    bindModuleButtons(experimentReady, unit1);
  }

  function renderModuleRow(module, experimentReady) {
    if (module.id === "technik-demo") {
      return `
        <div class="module">
          <span class="module-number">D</span>
          <span><strong>${esc(module.title)}</strong><small>${esc(module.subtitle)}</small></span>
          <button class="mini-button" data-action="demo">${state.demo.completedAt ? "wiederholen" : "starten"}</button>
        </div>
      `;
    }

    if (module.id !== "unit-1") {
      return `
        <div class="module muted-module">
          <span class="module-number">${module.number}</span>
          <span><strong>${esc(module.title)}</strong><small>${esc(module.subtitle)}</small></span>
          <span class="badge">geplant</span>
        </div>
      `;
    }

    const unitState = getUnitState("unit-1");
    const progress = unitProgress(unitState);
    let actionLabel = "starten";
    let action = "start-unit";
    let disabled = !experimentReady;
    let statusText = "bereit";

    if (unitState.status === "in_progress") {
      actionLabel = "fortsetzen";
      statusText = "läuft";
    }

    if (unitState.status === "waiting_delayed") {
      const ready = Date.now() >= new Date(unitState.delayedAvailableAt).getTime();
      actionLabel = ready ? "Erinnerungstest" : "gesperrt";
      action = ready ? "start-delayed" : "none";
      disabled = !ready;
      statusText = ready ? "jetzt bereit" : `ab ${formatDateTime(unitState.delayedAvailableAt)}`;
    }

    if (unitState.status === "complete") {
      actionLabel = "abgeschlossen";
      action = "none";
      disabled = true;
      statusText = "vollständig";
    }

    if (unitState.status === "excluded") {
      actionLabel = "nicht gewertet";
      action = "none";
      disabled = true;
      statusText = "zu viel Vorwissen";
    }

    return `
      <div class="module unit-module">
        <span class="module-number">1</span>
        <span>
          <strong>Versuchseinheit 1</strong>
          <small>${esc(statusText)}</small>
          <span class="inline-progress"><span style="width:${progress}%"></span></span>
        </span>
        <button class="mini-button" data-action="${action}" ${disabled ? "disabled" : ""}>${esc(actionLabel)}</button>
      </div>
    `;
  }

  function bindModuleButtons(experimentReady) {
    document.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;
        if (action === "demo") return startDemo();
        if (!experimentReady) {
          if (!state.participant.name.trim()) return go("profile");
          return go("parent");
        }
        if (action === "start-unit") return startOrResumeUnit("unit-1");
        if (action === "start-delayed") return startDelayed("unit-1");
      });
    });
  }

  function renderProfile() {
    app.innerHTML = `
      <section class="page-header">
        <div><p class="eyebrow dark">Teilnehmerprofil</p><h1>Versuch vorbereiten</h1></div>
        <button class="btn btn-ghost" id="backButton">Zurück</button>
      </section>

      <section class="card">
        <form id="profileForm">
          <div class="form-group">
            <label for="name">Vorname oder Kürzel</label>
            <input id="name" name="name" maxlength="30" value="${esc(state.participant.name)}" placeholder="z. B. Jonah" required>
          </div>
          <div class="form-group">
            <label for="age">Alter <span class="help">(optional)</span></label>
            <input id="age" name="age" type="number" min="6" max="99" value="${esc(state.participant.age)}" placeholder="12">
          </div>
          <p class="notice">Alle Angaben und Ergebnisse bleiben lokal im Browser dieses Geräts.</p>
          <div class="actions">
            <button class="btn btn-dark" type="submit">Profil speichern</button>
            <button class="btn btn-ghost" type="button" id="cancelButton">Abbrechen</button>
          </div>
        </form>
      </section>
    `;

    document.querySelector("#backButton").addEventListener("click", () => go("home"));
    document.querySelector("#cancelButton").addEventListener("click", () => go("home"));
    document.querySelector("#profileForm").addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      state.participant.name = String(data.get("name") || "").trim();
      state.participant.age = String(data.get("age") || "").trim();
      saveState();
      go("home");
    });
  }

  function startOrResumeUnit(unitId) {
    const unitState = getUnitState(unitId);
    if (unitState.status === "not_started") {
      unitState.status = "in_progress";
      state.active = { unitId, stage: "context", index: 0, testPhase: null, returnStage: null };
      saveState();
    } else if (!state.active || state.active.unitId !== unitId) {
      state.active = inferResumePoint(unitId, unitState);
      saveState();
    }
    go("unit");
  }

  function inferResumePoint(unitId, unitState) {
    if (!unitState.learning.startedAt) return { unitId, stage: "context", index: 0, testPhase: null };
    if (!unitState.learning.completedAt) return { unitId, stage: "learning", index: 0, testPhase: null };
    if (!unitState.immediate.completedAt) return { unitId, stage: "recall-prompt", index: 0, testPhase: "immediate" };
    return { unitId, stage: "waiting", index: 0, testPhase: null };
  }

  function startDelayed(unitId) {
    const unitState = getUnitState(unitId);
    if (!unitState.delayedAvailableAt || Date.now() < new Date(unitState.delayedAvailableAt).getTime()) return;
    unitState.status = "in_progress";
    state.active = { unitId, stage: "recall-prompt", index: 0, testPhase: "delayed", returnStage: null };
    saveState();
    go("unit");
  }

  function renderActiveUnit() {
    if (!state.active) return go("home");
    const unit = getActiveUnit();
    if (!unit) return go("home");
    const unitState = getUnitState(unit.id);
    const topic = getTopic(unit.id);
    const stage = state.active.stage;

    if (stage === "context") return renderContext(unitState);
    if (stage === "pretest") return renderPretest(unitState, topic);
    if (stage === "reserve-notice") return renderReserveNotice();
    if (stage === "learning-intro") return renderLearningIntro(topic);
    if (stage === "learning") return renderLearning(unitState, topic);
    if (stage === "recall-prompt") return renderRecallPrompt(topic);
    if (stage === "parent-gate") return renderParentGate();
    if (stage === "recall-score") return renderRecallScore(topic);
    if (stage === "understanding-prompt") return renderUnderstandingPrompt(topic);
    if (stage === "understanding-score") return renderUnderstandingScore(topic);
    if (stage === "sequence") return renderSequence(topic);
    if (stage === "transfer") return renderTransfer(topic);
    if (stage === "ratings") return renderRatings();
    if (stage === "complete-message") return renderCompletionMessage(unitState);
    return go("home");
  }

  function renderContext(unitState) {
    app.innerHTML = pageShell("Versuchseinheit 1", `
      <p class="lead">Bevor es losgeht, drei kurze Angaben zum heutigen Zustand.</p>
      ${ratingBlock("energy", "Wie fit fühlst du dich gerade?", unitState.context.energy)}
      ${ratingBlock("mood", "Wie ist deine Stimmung?", unitState.context.mood)}
      ${ratingBlock("focus", "Wie gut kannst du dich gerade konzentrieren?", unitState.context.focus)}
      <div class="actions">
        <button class="btn btn-dark" id="continueButton" ${unitState.context.energy && unitState.context.mood && unitState.context.focus ? "" : "disabled"}>Weiter</button>
      </div>
    `, "Startcheck");

    bindRatings(unitState.context);
    const button = document.querySelector("#continueButton");
    if (button) button.addEventListener("click", () => {
      state.active.stage = "pretest";
      state.active.index = 0;
      saveState();
      render();
    });
  }

  function renderPretest(unitState, topic) {
    const variant = unitState.topicVariant;
    if (!unitState.pretests[variant]) unitState.pretests[variant] = { answers: {}, score: null };
    const record = unitState.pretests[variant];
    const index = state.active.index || 0;
    const question = topic.pretest[index];
    const selected = record.answers[question.id] || null;

    app.innerHTML = pageShell("Kurzer Vorwissenscheck", `
      <div class="test-progress"><span style="width:${((index + 1) / topic.pretest.length) * 100}%"></span></div>
      <p class="question">${esc(question.prompt)}</p>
      <div class="choices">
        ${question.options.map(option => choiceMarkup(option, selected)).join("")}
      </div>
      <p class="help">Es gibt keine Rückmeldung zu einzelnen Antworten.</p>
      <div class="actions">
        <button class="btn btn-dark" id="nextButton" ${selected ? "" : "disabled"}>${index === topic.pretest.length - 1 ? "Abschließen" : "Nächste Frage"}</button>
      </div>
    `, `Frage ${index + 1} von ${topic.pretest.length}`);

    bindChoices(value => {
      record.answers[question.id] = value;
      saveState();
      render();
    });

    document.querySelector("#nextButton").addEventListener("click", () => {
      if (index < topic.pretest.length - 1) {
        state.active.index += 1;
        saveState();
        render();
        return;
      }

      record.score = topic.pretest.reduce((sum, item) => sum + (record.answers[item.id] === item.correct ? 1 : 0), 0);
      const threshold = config.pretestExclusionThreshold;
      if (record.score >= threshold && variant === "primary") {
        unitState.topicVariant = "reserve";
        state.active.stage = "reserve-notice";
        state.active.index = 0;
      } else if (record.score >= threshold && variant === "reserve") {
        unitState.status = "excluded";
        unitState.invalidReason = "Vorwissen auch beim Reservethema zu hoch";
        state.active = null;
        saveState();
        window.alert("Für diese Einheit war bereits zu viel Vorwissen vorhanden. Sie wird nicht gewertet.");
        return go("home");
      } else {
        state.active.stage = "learning-intro";
        state.active.index = 0;
      }
      saveState();
      render();
    });
  }

  function renderReserveNotice() {
    app.innerHTML = pageShell("Neues Thema", `
      <div class="notice">
        Das erste Thema war bereits zu bekannt. Damit der Versuch fair bleibt, wird jetzt ein unabhängiges Reservethema verwendet.
      </div>
      <p>Die bisherigen Antworten werden nicht als Lernergebnis gewertet.</p>
      <div class="actions"><button class="btn btn-dark" id="continueButton">Mit neuem Thema fortfahren</button></div>
    `, "Fairer Vergleich");

    document.querySelector("#continueButton").addEventListener("click", () => {
      state.active.stage = "pretest";
      state.active.index = 0;
      saveState();
      render();
    });
  }

  function renderLearningIntro(topic) {
    app.innerHTML = pageShell("Lernphase", `
      <div class="learning-intro-card">
        <span class="large-icon">◎</span>
        <h2>${esc(topic.publicTitle)}</h2>
        <p>Du hast genau sechs Minuten Zeit. Sieh dir alle Informationen aufmerksam an.</p>
      </div>
      <ul class="clean-list">
        <li>Während der Lernphase nichts aufschreiben.</li>
        <li>Keine zusätzlichen Erklärungen oder Hinweise.</li>
        <li>Nach Ablauf der Zeit werden die Inhalte automatisch ausgeblendet.</li>
      </ul>
      <div class="actions"><button class="btn btn-dark" id="startLearningButton">Sechs Minuten starten</button></div>
    `, "Bereit?");

    document.querySelector("#startLearningButton").addEventListener("click", () => {
      const unitState = getUnitState(state.active.unitId);
      unitState.learning.startedAt = new Date().toISOString();
      state.active.stage = "learning";
      saveState();
      render();
    });
  }

  function renderLearning(unitState, topic) {
    const started = new Date(unitState.learning.startedAt).getTime();
    const elapsed = Math.max(0, Math.floor((Date.now() - started) / 1000));
    const remaining = Math.max(0, config.learningSeconds - elapsed);

    if (remaining <= 0) {
      completeLearning(unitState);
      return;
    }

    const learning = topic.learning;
    app.innerHTML = `
      <section class="learning-header">
        <div><p class="eyebrow dark">${esc(learning.kicker)}</p><h1>${esc(topic.publicTitle)}</h1></div>
        <div class="small-timer" id="learningTimer">${formatDuration(remaining)}</div>
      </section>
      <section class="visual-board">
        <p class="visual-intro">${esc(learning.intro)}</p>
        <div class="visual-steps">
          ${learning.steps.map((step, index) => `
            <article class="visual-step">
              <span class="step-number">${step.number}</span>
              <span class="step-icon">${esc(step.icon)}</span>
              <h3>${esc(step.title)}</h3>
              <p>${esc(step.text)}</p>
              ${index < learning.steps.length - 1 ? '<span class="flow-arrow">→</span>' : ""}
            </article>
          `).join("")}
        </div>
        <div class="cause-grid">
          ${learning.causeEffects.map(item => `
            <article class="cause-card"><strong>${esc(item.cause)}</strong><span>führt dazu</span><strong>${esc(item.effect)}</strong></article>
          `).join("")}
        </div>
        <div class="fact-grid">
          ${learning.facts.map((fact, index) => `<div class="fact-chip"><span>${index + 1}</span>${esc(fact)}</div>`).join("")}
        </div>
        <div class="takeaway"><strong>Grundprinzip</strong><p>${esc(learning.takeaway)}</p></div>
      </section>
      <p class="help center">Die Lernphase endet automatisch. Bitte die Seite geöffnet lassen.</p>
    `;

    stopTimer();
    timerId = window.setInterval(() => {
      const nowElapsed = Math.max(0, Math.floor((Date.now() - started) / 1000));
      const nowRemaining = Math.max(0, config.learningSeconds - nowElapsed);
      const timer = document.querySelector("#learningTimer");
      if (timer) timer.textContent = formatDuration(nowRemaining);
      if (nowRemaining <= 0) completeLearning(unitState);
    }, 500);
  }

  function completeLearning(unitState) {
    stopTimer();
    unitState.learning.completedAt = new Date().toISOString();
    state.active.stage = "recall-prompt";
    state.active.testPhase = "immediate";
    state.active.index = 0;
    saveState();
    render();
  }

  function currentTestData(topic) {
    return topic[state.active.testPhase];
  }

  function currentTestState(unitState) {
    return unitState[state.active.testPhase];
  }

  function renderRecallPrompt(topic) {
    const data = currentTestData(topic);
    const delayed = state.active.testPhase === "delayed";
    app.innerHTML = pageShell(delayed ? "Erinnerungstest" : "Soforttest", `
      <div class="speaker-card">
        <span class="large-icon">◉</span>
        <h2>Frei erklären</h2>
        <p class="big-prompt">${esc(data.recall.prompt)}</p>
      </div>
      <ol class="clean-list numbered">
        <li>Keine Unterlagen ansehen.</li>
        <li>Jonah erklärt frei und ohne Hinweise.</li>
        <li>Erst wenn er fertig ist, wird das Gerät an den Erwachsenen gegeben.</li>
      </ol>
      <div class="actions"><button class="btn btn-dark" id="doneSpeakingButton">Erklärung beendet</button></div>
    `, "Teil 1 von 4");

    document.querySelector("#doneSpeakingButton").addEventListener("click", () => requestParentAccess("recall-score"));
  }

  function requestParentAccess(returnStage) {
    state.active.returnStage = returnStage;
    state.active.stage = "parent-gate";
    saveState();
    render();
  }

  function renderParentGate() {
    app.innerHTML = pageShell("Elternbereich", `
      <div class="parent-gate">
        <span class="large-icon">▣</span>
        <h2>Gerät jetzt an den Erwachsenen geben</h2>
        <p>Die folgenden Bewertungskriterien sollen während der Antwort nicht sichtbar sein.</p>
        <div class="form-group pin-group">
          <label for="pinInput">Eltern-PIN</label>
          <input id="pinInput" inputmode="numeric" maxlength="4" type="password" placeholder="••••">
        </div>
        <p class="error-message" id="pinError" hidden>Die PIN stimmt nicht.</p>
        <div class="actions"><button class="btn btn-dark" id="unlockButton">Bewertung öffnen</button></div>
      </div>
    `, "Geschützter Schritt");

    const input = document.querySelector("#pinInput");
    input.focus();
    document.querySelector("#unlockButton").addEventListener("click", () => {
      if (input.value !== state.participant.parentPin) {
        document.querySelector("#pinError").hidden = false;
        input.value = "";
        input.focus();
        return;
      }
      state.active.stage = state.active.returnStage;
      state.active.returnStage = null;
      saveState();
      render();
    });
  }

  function renderRecallScore(topic) {
    const unitState = getUnitState(state.active.unitId);
    const testState = currentTestState(unitState);
    const data = currentTestData(topic);
    const selected = new Set(testState.recallChecks || []);

    app.innerHTML = pageShell("Freie Erinnerung bewerten", `
      <p>Markiere nur Inhalte, die ohne Hinweis sinngemäß genannt wurden.</p>
      <div class="rubric-list">
        ${data.recall.criteria.map((criterion, index) => `
          <label class="rubric-check">
            <input type="checkbox" value="${index}" ${selected.has(index) ? "checked" : ""}>
            <span><strong>1 Punkt</strong>${esc(criterion)}</span>
          </label>
        `).join("")}
      </div>
      <div class="score-preview">Freie Erinnerung: <strong id="recallPreview">${selected.size} / 5</strong></div>
      <div class="actions"><button class="btn btn-dark" id="saveRecallButton">Bewertung speichern</button></div>
    `, "Maximal 5 Punkte");

    document.querySelectorAll('.rubric-check input').forEach(input => {
      input.addEventListener("change", () => {
        const checked = [...document.querySelectorAll('.rubric-check input:checked')].map(item => Number(item.value));
        document.querySelector("#recallPreview").textContent = `${checked.length} / 5`;
      });
    });

    document.querySelector("#saveRecallButton").addEventListener("click", () => {
      testState.recallChecks = [...document.querySelectorAll('.rubric-check input:checked')].map(item => Number(item.value));
      state.active.stage = "understanding-prompt";
      state.active.index = 0;
      saveState();
      render();
    });
  }

  function renderUnderstandingPrompt(topic) {
    const data = currentTestData(topic);
    const index = state.active.index || 0;
    const item = data.understanding[index];
    app.innerHTML = pageShell("Zusammenhang erklären", `
      <div class="speaker-card">
        <span class="large-icon">?</span>
        <p class="big-prompt">${esc(item.prompt)}</p>
      </div>
      <p>Jonah antwortet frei. Bitte noch keine Hilfestellung geben.</p>
      <div class="actions"><button class="btn btn-dark" id="answerDoneButton">Antwort beendet</button></div>
    `, `Teil 2 von 4 · Frage ${index + 1} von ${data.understanding.length}`);

    document.querySelector("#answerDoneButton").addEventListener("click", () => requestParentAccess("understanding-score"));
  }

  function renderUnderstandingScore(topic) {
    const unitState = getUnitState(state.active.unitId);
    const testState = currentTestState(unitState);
    const data = currentTestData(topic);
    const index = state.active.index || 0;
    const item = data.understanding[index];
    const current = testState.understandingScores[index];

    app.innerHTML = pageShell("Antwort bewerten", `
      <p class="question">${esc(item.prompt)}</p>
      <div class="score-options">
        ${item.rubric.map((text, score) => `
          <label class="score-option ${current === score ? "selected" : ""}">
            <input type="radio" name="understandingScore" value="${score}" ${current === score ? "checked" : ""}>
            <span>${esc(text)}</span>
          </label>
        `).join("")}
      </div>
      <div class="actions"><button class="btn btn-dark" id="saveUnderstandingButton" ${Number.isInteger(current) ? "" : "disabled"}>Bewertung speichern</button></div>
    `, "0 bis 2 Punkte");

    document.querySelectorAll('input[name="understandingScore"]').forEach(input => {
      input.addEventListener("change", () => {
        document.querySelectorAll('.score-option').forEach(label => label.classList.remove('selected'));
        input.closest('.score-option').classList.add('selected');
        document.querySelector("#saveUnderstandingButton").disabled = false;
      });
    });

    document.querySelector("#saveUnderstandingButton").addEventListener("click", () => {
      const selected = document.querySelector('input[name="understandingScore"]:checked');
      testState.understandingScores[index] = Number(selected.value);
      if (index < data.understanding.length - 1) {
        state.active.index += 1;
        state.active.stage = "understanding-prompt";
      } else {
        state.active.index = 0;
        state.active.stage = "sequence";
      }
      saveState();
      render();
    });
  }

  function renderSequence(topic) {
    const unitState = getUnitState(state.active.unitId);
    const testState = currentTestState(unitState);
    const data = currentTestData(topic).sequence;
    const order = testState.sequenceOrder || [];
    const remaining = data.options.filter(option => !order.includes(option.id));

    app.innerHTML = pageShell("Ablauf ordnen", `
      <p class="question">${esc(data.prompt)}</p>
      <div class="sequence-zone">
        ${order.length ? order.map((id, index) => {
          const option = data.options.find(item => item.id === id);
          return `<div class="sequence-selected"><span>${index + 1}</span>${esc(option.text)}</div>`;
        }).join("") : '<div class="empty-sequence">Tippe unten die Schritte in der richtigen Reihenfolge an.</div>'}
      </div>
      <div class="sequence-options">
        ${remaining.map(option => `<button class="choice" data-sequence-id="${option.id}">${esc(option.text)}</button>`).join("")}
      </div>
      <div class="actions">
        <button class="btn btn-ghost" id="undoButton" ${order.length ? "" : "disabled"}>Letzten Schritt zurück</button>
        <button class="btn btn-dark" id="saveSequenceButton" ${order.length === data.options.length ? "" : "disabled"}>Reihenfolge speichern</button>
      </div>
    `, "Teil 3 von 4");

    document.querySelectorAll('[data-sequence-id]').forEach(button => {
      button.addEventListener("click", () => {
        testState.sequenceOrder.push(button.dataset.sequenceId);
        saveState();
        render();
      });
    });
    document.querySelector("#undoButton").addEventListener("click", () => {
      testState.sequenceOrder.pop();
      saveState();
      render();
    });
    document.querySelector("#saveSequenceButton").addEventListener("click", () => {
      state.active.stage = "transfer";
      state.active.index = 0;
      saveState();
      render();
    });
  }

  function renderTransfer(topic) {
    const unitState = getUnitState(state.active.unitId);
    const testState = currentTestState(unitState);
    const data = currentTestData(topic).transfer;
    const index = state.active.index || 0;
    const item = data[index];
    const selected = testState.transferAnswers[item.id] || null;

    app.innerHTML = pageShell("Neues Beispiel", `
      <p class="question">${esc(item.prompt)}</p>
      <div class="choices">${item.options.map(option => choiceMarkup(option, selected)).join("")}</div>
      <div class="actions"><button class="btn btn-dark" id="nextTransferButton" ${selected ? "" : "disabled"}>${index === data.length - 1 ? "Abschließen" : "Weiter"}</button></div>
    `, `Teil 4 von 4 · Frage ${index + 1} von ${data.length}`);

    bindChoices(value => {
      testState.transferAnswers[item.id] = value;
      saveState();
      render();
    });

    document.querySelector("#nextTransferButton").addEventListener("click", () => {
      if (index < data.length - 1) {
        state.active.index += 1;
        saveState();
        render();
        return;
      }
      if (state.active.testPhase === "immediate") {
        state.active.stage = "ratings";
        state.active.index = 0;
      } else {
        finishTest("delayed");
      }
      saveState();
      render();
    });
  }

  function renderRatings() {
    const unitState = getUnitState(state.active.unitId);
    const ratings = unitState.immediate.ratings;
    app.innerHTML = pageShell("Deine Einschätzung", `
      ${ratingBlock("effort", "Wie anstrengend war diese Art zu lernen?", ratings.effort, "1 = gar nicht, 5 = sehr anstrengend")}
      ${ratingBlock("interest", "Wie interessant war diese Art zu lernen?", ratings.interest)}
      ${ratingBlock("confidence", "Wie sicher fühlst du dich beim Thema?", ratings.confidence)}
      ${ratingBlock("repeat", "Würdest du ein anderes Thema wieder so lernen?", ratings.repeat)}
      <div class="actions"><button class="btn btn-dark" id="finishButton" ${Object.values(ratings).every(Boolean) ? "" : "disabled"}>Einheit speichern</button></div>
    `, "Keine richtige oder falsche Antwort");

    bindRatings(ratings);
    const finishButton = document.querySelector("#finishButton");
    if (finishButton) finishButton.addEventListener("click", () => finishTest("immediate"));
  }

  function finishTest(phase) {
    const unitState = getUnitState(state.active.unitId);
    const topic = getTopic(state.active.unitId);
    const testState = unitState[phase];
    const data = topic[phase];
    testState.score = calculateTestScore(testState, data);
    testState.completedAt = new Date().toISOString();

    if (phase === "immediate") {
      unitState.delayedAvailableAt = new Date(Date.now() + delayMilliseconds()).toISOString();
      unitState.status = "waiting_delayed";
    } else {
      unitState.status = "complete";
    }

    state.active.stage = "complete-message";
    saveState();
    render();
  }

  function calculateTestScore(testState, data) {
    const recall = Math.min(5, testState.recallChecks.length);
    const understanding = testState.understandingScores.reduce((sum, value) => sum + Number(value || 0), 0);
    const sequence = scoreSequence(testState.sequenceOrder, data.sequence.correctOrder);
    const transfer = data.transfer.reduce((sum, item) => sum + (testState.transferAnswers[item.id] === item.correct ? item.points : 0), 0);
    return { recall, understanding, sequence, transfer, total: recall + understanding + sequence + transfer, max: 15 };
  }

  function scoreSequence(answer, correct) {
    if (answer.length !== correct.length) return 0;
    const exactPositions = answer.reduce((sum, id, index) => sum + (id === correct[index] ? 1 : 0), 0);
    if (exactPositions === correct.length) return 2;
    if (exactPositions >= 3 || (answer[0] === correct[0] && answer[answer.length - 1] === correct[correct.length - 1])) return 1;
    return 0;
  }

  function renderCompletionMessage(unitState) {
    const delayed = state.active.testPhase === "delayed";
    app.innerHTML = pageShell(delayed ? "Einheit vollständig abgeschlossen" : "Soforttest gespeichert", `
      <div class="completion-card">
        <span class="large-icon">✓</span>
        <h2>${delayed ? "Vielen Dank." : "Der erste Teil ist geschafft."}</h2>
        <p>${delayed
          ? "Sofort- und Erinnerungstest wurden gespeichert. Das Ergebnis bleibt bis zum Ende des gesamten Versuchs verborgen."
          : `Der Erinnerungstest wird ${isTestMode ? `in ${config.testModeDelayMinutes} Minuten` : `am ${formatDateTime(unitState.delayedAvailableAt)}`} freigeschaltet.`}</p>
      </div>
      <div class="actions"><button class="btn btn-dark" id="homeButton">Zur Startseite</button></div>
    `, delayed ? "Einheit 1 von 8" : "Keine Wiederholung bis dahin");

    document.querySelector("#homeButton").addEventListener("click", () => {
      state.active = null;
      saveState();
      go("home");
    });
  }

  function renderParentArea() {
    const pinExists = /^\d{4}$/.test(state.participant.parentPin);

    if (!pinExists) {
      app.innerHTML = pageShell("Elternbereich einrichten", `
        <div class="parent-gate">
          <h2>Eltern-PIN festlegen</h2>
          <p>
            Die PIN schützt Bewertungskriterien, Rücksetzfunktionen und Versuchsdaten.
            Sie wird nur auf diesem Gerät gespeichert.
          </p>
          <form id="parentPinSetupForm">
            <div class="form-group pin-group">
              <label for="newParentPin">Neue vierstellige PIN</label>
              <input
                id="newParentPin"
                name="newParentPin"
                inputmode="numeric"
                pattern="[0-9]{4}"
                maxlength="4"
                type="password"
                autocomplete="new-password"
                placeholder="••••"
                required
              >
            </div>
            <div class="form-group pin-group">
              <label for="repeatParentPin">PIN wiederholen</label>
              <input
                id="repeatParentPin"
                name="repeatParentPin"
                inputmode="numeric"
                pattern="[0-9]{4}"
                maxlength="4"
                type="password"
                autocomplete="new-password"
                placeholder="••••"
                required
              >
            </div>
            <p class="error-message" id="parentPinSetupError" hidden></p>
            <div class="actions">
              <button class="btn btn-dark" type="submit">PIN festlegen</button>
              <button class="btn btn-ghost" type="button" id="backButton">Zurück</button>
            </div>
          </form>
        </div>
      `, "Einmalige Einrichtung");

      document.querySelector("#backButton").addEventListener("click", () => go("home"));
      document.querySelector("#parentPinSetupForm").addEventListener("submit", event => {
        event.preventDefault();
        const firstPin = document.querySelector("#newParentPin").value.trim();
        const secondPin = document.querySelector("#repeatParentPin").value.trim();
        const error = document.querySelector("#parentPinSetupError");

        if (!/^\d{4}$/.test(firstPin)) {
          error.textContent = "Bitte eine vierstellige PIN aus Ziffern eingeben.";
          error.hidden = false;
          return;
        }

        if (firstPin !== secondPin) {
          error.textContent = "Die beiden PIN-Eingaben stimmen nicht überein.";
          error.hidden = false;
          return;
        }

        state.participant.parentPin = firstPin;
        saveState();
        renderParentDashboard();
      });
      return;
    }

    app.innerHTML = pageShell("Elternbereich", `
      <div class="parent-gate">
        <h2>PIN eingeben</h2>
        <p>Hier können Sicherungen erstellt oder eine begonnene Testeinheit zurückgesetzt werden.</p>
        <form id="parentLoginForm">
          <div class="form-group pin-group">
            <label for="parentAreaPin">Eltern-PIN</label>
            <input
              id="parentAreaPin"
              inputmode="numeric"
              maxlength="4"
              type="password"
              autocomplete="current-password"
              placeholder="••••"
              required
            >
          </div>
          <p class="error-message" id="parentAreaError" hidden>Die PIN stimmt nicht.</p>
          <div class="actions">
            <button class="btn btn-dark" type="submit">Öffnen</button>
            <button class="btn btn-ghost" type="button" id="backButton">Zurück</button>
          </div>
        </form>
      </div>
    `, "Geschützt");

    document.querySelector("#backButton").addEventListener("click", () => go("home"));
    document.querySelector("#parentLoginForm").addEventListener("submit", event => {
      event.preventDefault();
      const pin = document.querySelector("#parentAreaPin").value.trim();
      if (pin !== state.participant.parentPin) {
        document.querySelector("#parentAreaError").hidden = false;
        return;
      }
      renderParentDashboard();
    });
  }

  function renderParentDashboard() {
    const unitState = getUnitState("unit-1");
    app.innerHTML = pageShell("Elternbereich", `
      <div class="grid grid-2">
        <article class="card inner-card">
          <h2>Versuchseinheit 1</h2>
          <p><strong>Status:</strong> ${esc(statusLabel(unitState.status))}</p>
          <p><strong>Themenvariante:</strong> ${unitState.topicVariant === "reserve" ? "Reservethema" : "Hauptthema"}</p>
          <p><strong>Erinnerungstest:</strong> ${unitState.delayedAvailableAt ? esc(formatDateTime(unitState.delayedAvailableAt)) : "noch nicht terminiert"}</p>
          <p class="help">Punktwerte werden bewusst nicht angezeigt, solange der Gesamtversuch nicht abgeschlossen ist.</p>
        </article>
        <article class="card inner-card">
          <h2>Daten</h2>
          <div class="actions vertical-actions">
            <button class="btn btn-dark" id="exportButton">JSON-Sicherung exportieren</button>
            <button class="btn btn-danger" id="resetUnitButton">Einheit 1 zurücksetzen</button>
          </div>
        </article>
      </div>
      <div class="actions"><button class="btn btn-ghost" id="homeButton">Zur Startseite</button></div>
    `, "Keine Zwischenrangliste");

    document.querySelector("#exportButton").addEventListener("click", exportData);
    document.querySelector("#homeButton").addEventListener("click", () => go("home"));
    document.querySelector("#resetUnitButton").addEventListener("click", () => {
      if (!window.confirm("Versuchseinheit 1 vollständig löschen und neu beginnen? Dies sollte nur bei einem technischen Fehler geschehen.")) return;
      delete state.units["unit-1"];
      if (state.active?.unitId === "unit-1") state.active = null;
      saveState();
      renderParentDashboard();
    });
  }

  function statusLabel(status) {
    const labels = {
      not_started: "noch nicht begonnen",
      in_progress: "in Bearbeitung",
      waiting_delayed: "wartet auf Erinnerungstest",
      complete: "vollständig abgeschlossen",
      excluded: "nicht gewertet"
    };
    return labels[status] || status;
  }

  function renderDemo() {
    app.innerHTML = pageShell("Technik-Demo", `
      <div class="completion-card">
        <span class="large-icon">⚙</span>
        <h2>Technik funktioniert</h2>
        <p>Diese Demo prüft nur Navigation und lokale Speicherung. Sie zählt nicht zum Lernprofil.</p>
      </div>
      <div class="actions">
        <button class="btn btn-dark" id="completeDemoButton">Demo als erledigt speichern</button>
        <button class="btn btn-ghost" id="backButton">Zurück</button>
      </div>
    `, "Ohne Auswirkung auf den Versuch");

    document.querySelector("#backButton").addEventListener("click", () => go("home"));
    document.querySelector("#completeDemoButton").addEventListener("click", () => {
      state.demo.completedAt = new Date().toISOString();
      state.demo.score = 1;
      saveState();
      go("home");
    });
  }

  function startDemo() {
    go("demo");
  }

  function pageShell(title, content, kicker = "") {
    return `
      <section class="page-header">
        <div><p class="eyebrow dark">${esc(kicker)}</p><h1>${esc(title)}</h1></div>
        <button class="btn btn-ghost" id="exitButton">Zur Startseite</button>
      </section>
      <section class="card">${content}</section>
    `;
  }

  function bindExitButton() {
    const exit = document.querySelector("#exitButton");
    if (exit) exit.addEventListener("click", () => go("home"));
  }

  const originalRender = render;
  render = function wrappedRender() {
    originalRender();
    bindExitButton();
  };

  function ratingBlock(field, label, selected, scaleText = "1 = sehr niedrig, 5 = sehr hoch") {
    return `
      <div class="rating-block">
        <p class="question">${esc(label)}</p>
        <div class="rating" data-rating-field="${field}">
          ${[1, 2, 3, 4, 5].map(value => `<button type="button" data-rating-value="${value}" class="${Number(selected) === value ? "selected" : ""}">${value}</button>`).join("")}
        </div>
        <p class="help">${esc(scaleText)}</p>
      </div>
    `;
  }

  function bindRatings(target) {
    document.querySelectorAll("[data-rating-field]").forEach(group => {
      group.querySelectorAll("[data-rating-value]").forEach(button => {
        button.addEventListener("click", () => {
          target[group.dataset.ratingField] = Number(button.dataset.ratingValue);
          saveState();
          render();
        });
      });
    });
  }

  function choiceMarkup(option, selected) {
    return `<button type="button" class="choice ${selected === option.id ? "selected" : ""}" data-choice-value="${option.id}">${esc(option.text)}</button>`;
  }

  function bindChoices(onSelect) {
    document.querySelectorAll("[data-choice-value]").forEach(button => {
      button.addEventListener("click", () => onSelect(button.dataset.choiceValue));
    });
  }

  function formatDuration(seconds) {
    const safe = Math.max(0, seconds);
    return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
  }

  function formatDateTime(value) {
    if (!value) return "–";
    return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  }

  function exportData() {
    const payload = {
      app: "Lernprofil-Coach",
      version: config.version,
      exportedAt: new Date().toISOString(),
      testMode: isTestMode,
      data: state
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lernprofil-sicherung-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function stopTimer() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function updateNetwork() {
    const online = navigator.onLine;
    network.textContent = online ? "Online" : "Offline";
    network.classList.toggle("offline", !online);
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js?v=023", { updateViaCache: "none" })
        .then(registration => registration.update())
        .catch(error => console.warn("Service Worker konnte nicht registriert werden.", error));
    });
  }

  window.addEventListener("online", updateNetwork);
  window.addEventListener("offline", updateNetwork);
  updateNetwork();
  saveState();
  render();
})();
