# Mystery Game UI Design

## Purpose and scope

Build a desktop-only UI prototype for the single-player murder mystery game. Use mock data and canned replies; do not connect a backend or call an AI model. Each playthrough has exactly three placeholder suspects. Do not invent actual mystery content, suspect biographies, alibis, or evidence.

The approved visual direction is the dark, cinematic concept in assets/Skjermbilde 2026-10-08 133600.png. The other image provides a lo-fi flow reference. Preserve the repository rule that visual representation is owned by Jenny.

## Technology and local run

Use Vite, React, JavaScript, and CSS. Run locally with npm install followed by npm run dev. Keep implementation readable for four students to edit with vibe coding. Do not add a backend or external UI dependencies in this phase.

## Screens and flow

Implement a runnable application in these steps, leaving it runnable after each screen:

1. App shell and case intro.
2. Main hub centered on the murderboard. This is the page after the intro and the primary navigation point. It shows the shared board, an overview of the three suspects, and a way to accuse. Selecting a suspect opens the shared interrogation screen. A separate map screen is not part of this pass.
3. One shared interrogation screen that switches the selected suspect while preserving separate conversation histories; returning to the hub shows the shared board state.
4. Accusation and result screens, reachable from the hub.

Extra screens shown in the concept image, such as settings and expanded case-file views, are outside this phase.

## Interactions and data

- The player writes free-text chat messages. Do not show fixed starter questions.
- Show clearly distinct player and suspect messages, a dynamic conversational placeholder, and an optional on-demand placeholder hint.
- Put canned reply behavior behind getSuspectReply(suspectId, playerMessage). The UI must not call a model directly.
- The hub board supports evidence cards, player notes, and pinned chat snippets. Clearly label the pin action, for example “Pin to board,” and make the resulting snippet visible on the hub.
- Allow accusing one of the three suspects and show a placeholder outcome.
- Keep mock suspect, clue, evidence, and reply data in one data module, shaped so real definitions and replies can replace them later.
- Preserve board items and each suspect’s conversation history while navigating between screens during a playthrough.

## Constraints

- Desktop-only for this UI pass.
- Use obvious placeholders such as “Suspect A” and “Clue 1”; use non-story placeholder replies.
- Exclude suicide, sexual content, and harassment. Evidence must be plain and human-observable, never technical or domain-specific.
- Keep secrets out of frontend code; no API key or model integration is needed in this phase.

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

The supplied visuals are static screenshots, so exact typography, assets, and interaction details may need Jenny’s direction during implementation. Follow the reference where clear and ask before making visual choices that would materially change the design.

