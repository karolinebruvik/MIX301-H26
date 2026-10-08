# Mystery Game UI Design

## Purpose and scope

Build a desktop-only UI prototype for the single-player murder mystery game. Use mock data and canned replies; do not connect a backend or call an AI model. Each playthrough has exactly three placeholder suspects. Do not invent actual mystery content, suspect biographies, alibis, or evidence.

The approved visual direction is the dark, cinematic concept in assets/Skjermbilde 2026-10-08 133600.png. The other image provides a lo-fi flow reference. Preserve the repository rule that visual representation is owned by Jenny.

The intended experience is lightly guided rather than sequential. A typical playthrough should be completable in roughly 5–7 minutes, but the player may take longer without a countdown or pressure. The core arc is: orient, explore, organize information, and decide.

## User journey

1. Case intro establishes the objective and leads to the hub.
2. The hub gives the player an overview of the murderboard and all three suspects.
3. The player opens any suspect’s interrogation, asks free-text questions, and may switch directly between suspects.
4. The player returns to the hub whenever they want to review the murderboard, evidence archive, pins, and notes.
5. The player may continue investigating or open accusation at any time. Accusation is available throughout the active case but is visually secondary to investigation.
6. The player confirms one of the three suspects, sees the result screen, and may return to the same case board. Starting a new round is a separate explicit action.

Navigation must preserve every suspect’s conversation history, every per-suspect input draft, the evidence archive, pinned messages, and player notes. No suspect must be questioned in a prescribed order.

## Core game loop

The conversational loop is:

`Ask → receive a reply → interpret → optionally pin or note → compare → continue or accuse`

The player creates meaning through their own questions and organization. The UI must not present a progress bar, score, percentage, or “you are ready” state. Progress should be felt indirectly through conversation history, collected material, pins, and notes.

Hints are optional. The hint control is always available but visually quiet. After clear inactivity, the UI may show a dismissible invitation to ask for help, but the hint itself only appears after the player actively requests it. A hint gives direction, not a solution, and never pins material automatically.

## Technology and local run

Use Vite, React, JavaScript, and CSS. Run locally with npm install followed by npm run dev. Keep implementation readable for four students to edit with vibe coding. Do not add a backend or external UI dependencies in this phase.

## Screens and flow

Implement a runnable application in these steps, leaving it runnable after each screen:

1. App shell and case intro.
2. Main hub centered on the murderboard. This is the page after the intro and the primary navigation point. It shows the shared board, a side menu with all three suspects, and a separate accusation action. Selecting a suspect opens the shared interrogation modal. A separate map screen is not part of this pass.
3. One shared interrogation modal layered over the hub. It switches the selected suspect while preserving separate conversation histories and drafts. Closing the modal returns the player directly to the same murderboard state.
4. Accusation and result screens, reachable from the hub.

Extra screens shown in the concept image, such as settings and expanded case-file views, are outside this phase.

## Hub and murderboard

The hub is the full page. The murderboard is one distinct, central area inside the hub, not the name for the entire interface.

- The murderboard is the largest visual area and remains the stable base of the case.
- A suspect side menu sits beside it and contains three relatively large suspect cards with photographic portrait placeholders, name, neutral role information, and interview status (`Not interviewed` or `Interview started`).
- The suspect side menu is always available while in the hub. The player can move freely between the hub, any interrogation, and accusation.
- Accusation is a separate, clearly findable but discreet action, not part of the suspect cards.
- All core hub functions must fit within one desktop view without requiring the player to scroll to understand the layout.

The murderboard contains three visible sections at the same time:

- Evidence cards.
- Pinned chat messages.
- Player-written notes.

The board starts with a small amount of known case material. The exact content is selected with the mystery case later. New clues are discovered through suspect conversations; undiscovered clues must never appear in a browsable list. Discovered material is stored in an evidence archive. The player chooses what to place on the murderboard and may remove it later without losing it from the archive. Notes are editable and deletable. Pinned messages can be unpinned.

## Interrogation modal

The interrogation is a large modal over the hub rather than a separate full page. The murderboard remains visible behind a subdued backdrop. The modal can close through a visible close/back action, Escape, or clicking outside the modal. Closing never loses submitted messages or saved drafts.

Inside the modal:

- The active suspect has a name, photographic portrait placeholder, neutral role information, and a short opening message.
- The three suspects appear as cards inside the modal. Each card supports direct switching, shows interview status, and includes a small preview of that suspect’s latest message.
- Each suspect has an independent message history and independent unsent input draft.
- The player uses one fully free-text input. Starter questions are not selectable controls.
- The empty input displays rotating, general placeholder tips such as “Ask about the location…” or “Ask about the time…”. Placeholder text disappears while typing and never sends anything automatically.
- Each message offers “Pin to board” on hover. Pinning is optional and does not alter the conversation.
- The hint control is available on demand as described in the core loop.

The three placeholder suspects may have different general conversational tones in the prototype, such as direct, formal, or relaxed, without introducing actual case facts.

## Interactions and data

- The player writes free-text chat messages. Do not show tap-to-send starter questions or fixed answer options.
- Show clearly distinct player and suspect messages, rotating general placeholder tips, and an optional on-demand hint.
- Put canned reply behavior behind getSuspectReply(suspectId, playerMessage). The UI must not call a model directly.
- The hub board supports evidence cards, player notes, and pinned chat snippets. Clearly label the pin action, for example “Pin to board,” and make the resulting snippet visible on the hub.
- Allow accusing one of the three suspects and show a placeholder outcome.
- Keep mock suspect, clue, evidence, and reply data in one data module, shaped so real definitions and replies can replace them later.
- Preserve board items, the evidence archive, each suspect’s conversation history, and each suspect’s input draft while navigating during a playthrough.

## Constraints

- Desktop-only for this UI pass.
- Use obvious placeholders such as “Suspect A” and “Clue 1”; use non-story placeholder replies.
- Exclude suicide, sexual content, and harassment. Evidence must be plain and human-observable, never technical or domain-specific.
- Keep secrets out of frontend code; no API key or model integration is needed in this phase.

## Visual identity

The visual identity combines an old-school mystery and newspaper/case-file feeling with a dark cinematic base.

- Use a dark charcoal foundation with restrained blue/green and muted red accents, plus neutral paper tones. Avoid an overly sepia palette.
- Use serif typography throughout the interface, including chat, buttons, navigation, and important instructions. Establish hierarchy through size, weight, contrast, spacing, and line height rather than switching to a sans-serif font.
- Keep chat and important functional text highly readable with strong contrast and generous spacing.
- Use analog details throughout the UI: paper layers, tape, photographs, case-file surfaces, and restrained handwritten decoration.
- Handwritten styling is reserved for decorative board elements and player notes; it must not be used for chat or other essential information.
- Suspect imagery should use older analog/vintage photographic portraits in the eventual case, while the prototype uses clear placeholders.
- Use micro-animations primarily as feedback to player actions: hover/focus states, modal open/close, pinning, saving, and incoming messages. Add only a small amount of ambient movement for atmosphere. Animations should be subtle and respect reduced-motion preferences.

## Proposed project structure

src/
  App.jsx
  components/
    CaseIntro.jsx
    MainHub.jsx
    InterrogationRoom.jsx
    Accusation.jsx
    Result.jsx
  data/
    mock.js
  services/
    getSuspectReply.js
  styles/
    ...

The exact component breakdown may follow existing conventions if the repository gains a scaffold before implementation. Keep screen-specific UI separate and shared playthrough state in the app shell or a small state module.

## Open implementation detail

The supplied visuals are static screenshots, so exact typography, assets, portrait treatment, motion details, and spacing may need Jenny’s direction during implementation. Follow the approved direction above and ask before making visual choices that materially change it. The actual mystery content, suspect biographies, personalities, alibis, clues, and evidence are intentionally deferred until a mystery case is selected.
