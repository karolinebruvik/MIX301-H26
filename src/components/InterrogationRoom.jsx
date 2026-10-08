import { useState } from "react";
import { CHAT_NUDGES } from "../data/mock.js";

export default function InterrogationRoom({
  suspect,
  suspects,
  messages,
  pinnedMessageIds,
  onSendMessage,
  onSelectSuspect,
  onPinToBoard,
  onShowHint,
  onReturnToHub,
}) {
  const [draft, setDraft] = useState("");
  const [showHint, setShowHint] = useState(false);
  const placeholder = CHAT_NUDGES[messages.length % CHAT_NUDGES.length];

  function handleSubmit(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onSendMessage(text);
    setDraft("");
  }

  return (
    <main className="interrogation-screen">
      <header className="interrogation-topbar">
        <button className="back-to-board" onClick={onReturnToHub}><span>←</span> MURDERBOARD</button>
        <div className="interrogation-case-label"><span className="hub-brand__mark">C</span><span>CASE FILE <small>INTERVIEW ROOM</small></span></div>
        <span className="hub-session"><i /> SESSION ACTIVE</span>
      </header>

      <div className="interrogation-layout">
        <aside className="interview-sidebar">
          <span className="eyebrow">PERSON OF INTEREST</span>
          <div className={`interview-portrait interview-portrait--${suspect.tone}`}>
            <div className="portrait-orbit portrait-orbit--one" />
            <div className="portrait-orbit portrait-orbit--two" />
            <span>{suspect.initials}</span>
            <small>PLACEHOLDER PROFILE</small>
          </div>
          <h1>{suspect.name}</h1>
          <p className="interview-role">{suspect.role}</p>
          <div className="interview-divider" />
          <span className="eyebrow">SELECT A SUSPECT</span>
          <div className="interview-suspect-list">
            {suspects.map((item, index) => (
              <button className={`interview-suspect${item.id === suspect.id ? " is-active" : ""}`} key={item.id} onClick={() => onSelectSuspect(item.id)}>
                <span className={`suspect-avatar suspect-avatar--${item.tone}`}>{item.initials}</span>
                <span><strong>{item.name}</strong><small>PERSON OF INTEREST</small></span>
                <i>{item.id === suspect.id ? "●" : "○"}</i>
              </button>
            ))}
          </div>
          <p className="history-note">Each conversation is saved separately.</p>
        </aside>

        <section className="interview-chat" aria-label={`Conversation with ${suspect.name}`}>
          <div className="chat-heading">
            <div><span className="eyebrow">INTERROGATION / {suspect.name.toUpperCase()}</span><h2>Conversation</h2></div>
            <span className="chat-count">{messages.length} {messages.length === 1 ? "MESSAGE" : "MESSAGES"}</span>
          </div>

          <div className="chat-transcript" aria-live="polite">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <span className="chat-empty__symbol">◌</span>
                <strong>The conversation is ready</strong>
                <p>Ask {suspect.name} a question in your own words.</p>
              </div>
            ) : messages.map((message) => {
              const isPlayer = message.role === "player";
              const pinned = pinnedMessageIds.has(message.id);
              return (
                <article className={`chat-message ${isPlayer ? "chat-message--player" : "chat-message--suspect"}`} key={message.id}>
                  <div className="chat-message__meta">
                    <span>{isPlayer ? "YOU" : suspect.name.toUpperCase()}</span>
                    <time>{message.time}</time>
                  </div>
                  <div className="chat-bubble">{message.text}</div>
                  <button className={`pin-message${pinned ? " pin-message--done" : ""}`} onClick={() => onPinToBoard(message)} disabled={pinned}>
                    {pinned ? "✓ PINNED TO BOARD" : "＋ PIN TO BOARD"}
                  </button>
                </article>
              );
            })}
          </div>

          <div className="chat-controls">
            {showHint && <div className="hint-callout"><span>HINT</span><p>Think about what you have noticed and ask a specific follow-up.</p></div>}
            <div className="chat-tools">
              <button className="hint-button" onClick={() => { setShowHint((value) => !value); onShowHint?.(); }} aria-expanded={showHint}>ⓘ <span>Need a hint?</span></button>
              <span className="free-text-label">FREE-TEXT CHAT</span>
            </div>
            <form className="chat-composer" onSubmit={handleSubmit}>
              <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={placeholder} rows="2" maxLength={500} aria-label="Write a message" />
              <button type="submit" aria-label="Send message" disabled={!draft.trim()}>↑</button>
            </form>
            <p className="chat-footnote">Your messages are saved in this conversation.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
