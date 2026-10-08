AGENTS.md

Context for Codex. Read this before every task. Keep it short; the team updates it as decisions change.

Project

A single-player murder mystery game. The player interrogates AI suspects through free-text chat (no dialogue trees, no fixed answer options), collects evidence on a shared board, and accuses one suspect.

Target session length: 5-7 minutes. Exactly 3 suspects per playthrough.

Current phase: build the UI

We are building the interface first. The suspect characters (their knowledge, alibis, personalities) are not written yet, and the AI agent logic comes later.

So for now:

Build every screen and interaction against mock data and mock replies. Do not call the OpenAI API yet.
Keep mock data in one place ([TODO: path, e.g. /src/data/mock.js]) and shape it so it can later be replaced by real suspect definitions and real agent replies without rewriting the UI.
Put the chat reply logic behind a single function (for example getSuspectReply(suspectId, playerMessage)) that currently returns a canned reply. Later this function will call the backend. The UI must never talk to a model directly.
Do not invent a mystery, suspects, alibis or evidence. Use obvious placeholders ("Suspect A", "Clue 1", lorem-style replies) so nobody mistakes them for real content.
Screens and interactions
Interrogation room (one per suspect, 3 total): a chat interface with the suspect. The player types free text. Messages from the player and the suspect are clearly distinguished. Switching between suspects keeps each conversation's history.
Murderboard: a shared space where the player gathers evidence and notes across all suspects. [TODO: how items get onto the board, e.g. player-written notes, pinned chat snippets, evidence cards. Fill in from the design.]
Accuse action: a button that lets the player accuse one of the 3 suspects, leading to a result screen.

Chat input rules:

The input is free text only. Do not add tap-to-select starter questions.
The input field has a dynamic placeholder with vague conversational nudges (for example "location?", "what about the clue?").
There is an optional on-demand hint button for players who are stuck. For now it can show a placeholder hint.
Design
Design reference: [TODO: where the design lives, e.g. Claude Design export, screenshots in /design, Figma link]
Follow the design for layout, colors, typography and spacing. If the design is unclear or missing something, ask instead of guessing.
Visual representation is owned by Jenny. Do not restyle things on your own initiative.
Build the layout responsively. [TODO: confirm desktop-first or mobile-first]
Content boundaries

The game must not include suicide, sexual content or harassment. Evidence in the game will be plain and human-observable, never technical or domain-specific.

Tech stack
Frontend: [TODO]
Backend: [TODO, may not be needed until agents are connected]
Run locally: [TODO: install and start commands]
File structure: [TODO: paste once the first plan is approved]

When the OpenAI API is connected later, the key lives only on the backend in an environment variable. Never put it in frontend code or commit it. Keep .env in .gitignore.

How to work
For any non-trivial task, propose a plan first and wait for approval before editing files.
Make one change per task. Do not add features, refactor unrelated code or install new dependencies unless asked.
Build one screen or component at a time, in a state where the team can run it and look at it.
Prefer simple, readable code over clever code. Four people will read and edit this repo.
Commit-sized changes: leave the project in a runnable state after every task.
When you finish, say what you changed and flag any assumption you made.