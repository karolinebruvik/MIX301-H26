import { useState } from "react";

export default function Accusation({ suspects, onAccuse, onCancel }) {
  const [selectedId, setSelectedId] = useState("");

  function submit(event) {
    event.preventDefault();
    if (selectedId) onAccuse(selectedId);
  }

  return (
    <main className="decision-screen">
      <header className="interrogation-topbar">
        <button className="back-to-board" onClick={onCancel}><span>←</span> MURDERBOARD</button>
        <div className="interrogation-case-label"><span className="hub-brand__mark">C</span><span>CASE FILE <small>FINAL DECISION</small></span></div>
        <span className="hub-session"><i /> CASE FILE / 001</span>
      </header>
      <form className="accusation-content" onSubmit={submit}>
        <span className="eyebrow"><span>04</span> ACCUSATION</span>
        <h1>Who do you accuse?</h1>
        <p className="decision-intro">Review your notes and select one person of interest.</p>
        <div className="accusation-choices">
          {suspects.map((suspect, index) => (
            <button type="button" className={`accusation-choice${selectedId === suspect.id ? " is-selected" : ""}`} key={suspect.id} onClick={() => setSelectedId(suspect.id)} aria-pressed={selectedId === suspect.id}>
              <span className={`suspect-avatar suspect-avatar--${suspect.tone}`}>{suspect.initials}</span>
              <strong>{suspect.name}</strong>
              <small>PERSON OF INTEREST</small>
              <span className="choice-number">0{index + 1}</span>
            </button>
          ))}
        </div>
        <div className="decision-actions">
          <button className="secondary-button" type="button" onClick={onCancel}>Back to murderboard</button>
          <button className="primary-button" type="submit" disabled={!selectedId}><span>Submit accusation</span><span aria-hidden="true">↗</span></button>
        </div>
      </form>
    </main>
  );
}
