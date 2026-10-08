# Mystery Game UI Implementation Plan

> **For agentic workers:** Implement this plan task-by-task and keep the app runnable after each task.

**Goal:** Build a desktop-only, dark cinematic mystery game UI using placeholder content and mock interactions.

**Architecture:** A small Vite + React app owns screen selection and playthrough state. Focused screen components receive the state and callbacks they need; mock content lives in one data module and mock suspect replies live behind one service function.

**Tech Stack:** Vite, React, JavaScript, CSS.

**Spec:** docs/superpowers/specs/2026-10-08-mystery-game-ui-design.md

## Global Constraints

- Exactly three placeholder suspects per playthrough.
- No real mystery content, biographies, alibis, or evidence; use obvious placeholders.
- Desktop-only for this UI pass.
- No backend or model calls. The UI uses getSuspectReply(suspectId, playerMessage).
- Free-text chat only; no fixed starter questions.
- Keep each suspect’s history and shared board state while navigating.
- The main hub is the shared murderboard and suspect overview after the case intro; suspect selection opens interrogation.
- The board supports evidence cards, player notes, and pinned chat snippets; label pin action clearly.
- Exclude suicide, sexual content, and harassment. Evidence is plain and human-observable, never technical or domain-specific.
- Follow the dark cinematic reference in assets/Skjermbilde 2026-10-08 133600.png; ask Jenny when a material visual choice is unclear.
- Leave the app runnable after each task. Run with npm install and npm run dev.
- Do not add or run automated tests in this pass.

## Review Focus

- Empty or whitespace-only chat submissions should not create messages.
- Switching suspects must restore the correct independent conversation history.
- Pinning a chat message should add that exact message to the shared board once.
- Navigating from interrogation to the hub must preserve board items and histories.
- Accusation should only submit one of the three available placeholder suspects.

---

### Task 1: Runnable shell and case intro

**Files:**
- Create: package.json, package-lock.json, index.html, vite.config.js
- Create: src/main.jsx, src/App.jsx
- Create: src/components/CaseIntro.jsx
- Create: src/styles/app.css

**Interfaces:**
- App starts on the case intro and transitions to the main hub when the player starts the case.

- [ ] Set up the minimal Vite React project and implement the case intro as the initial screen.
- [ ] Run npm install, then npm run dev; manually confirm the app opens and the start action leads to a runnable hub placeholder.

### Task 2: Murderboard-centered main hub

**Files:**
- Create: src/components/MainHub.jsx
- Create: src/data/mock.js
- Modify: src/App.jsx, src/styles/app.css

**Interfaces:**
- mock.js exports exactly three placeholder suspects and placeholder evidence records.
- MainHub receives suspects, shared board items, onAddNote(text), onAddEvidence(evidenceId), onAccuse(), and onOpenInterrogation(suspectId).
- Selecting a suspect opens the shared interrogation screen; the full screen is added in Task 3.

- [ ] Add the central hub with a murderboard as its main content, plus suspect and evidence overviews.
- [ ] Add player notes, evidence-card placement, and an accusation entry point.
- [ ] Run npm run dev; manually confirm the hub is usable, shows exactly three suspects, and can select a suspect to open the Task 3 placeholder.

### Task 3: Shared interrogation and mock conversation

**Files:**
- Create: src/components/InterrogationRoom.jsx
- Create: src/services/getSuspectReply.js
- Modify: src/data/mock.js, src/App.jsx, src/styles/app.css

**Interfaces:**
- getSuspectReply(suspectId, playerMessage) returns a canned placeholder string.
- App passes suspectId, that suspect’s messages, onSendMessage, onSelectSuspect, onPinToBoard, onShowHint, and onReturnToHub.
- Message shape: { id, role, text }; role is player or suspect.

- [ ] Add free-text chat, distinct player/suspect message presentation, dynamic placeholder nudges, optional hint, suspect switching, and independent histories.
- [ ] Add a clearly labeled “Pin to board” action for player and suspect messages.
- [ ] Run npm run dev; manually confirm submit, empty-input handling, hint, switching/history restoration, pin action, and return to hub.

### Task 4: Accusation and result

**Files:**
- Create: src/components/Accusation.jsx, src/components/Result.jsx
- Modify: src/App.jsx, src/styles/app.css

**Interfaces:**
- Accusation consumes the three suspect records and calls onAccuse(suspectId).
- Result consumes the selected suspect and shows placeholder outcome copy, with navigation back to the hub.

- [ ] Add accusation choice and placeholder result screen, reachable from the hub.
- [ ] Run npm run dev; manually confirm only the three available suspects can be submitted and the result can return to the hub.

---


