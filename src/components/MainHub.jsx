function BoardCard({ item }) {
  const marker = item.type === "note" ? "NOTE" : item.type === "pinned-message" ? "CHAT EXCERPT" : "EVIDENCE";
  return (
    <article className={`board-card board-card--${item.type}`}>
      <span className="board-card__marker">{marker}</span>
      <strong>{item.title || (item.type === "note" ? "Investigator note" : item.sourceSuspectName || "Pinned conversation")}</strong>
      <p>{item.text}</p>
      {item.sourceSuspectName && <small>— {item.sourceSuspectName}</small>}
    </article>
  );
}

export default function MainHub({
  suspects,
  evidence,
  boardItems,
  onAddNote,
  onAddEvidence,
  onOpenInterrogation,
  onAccuse,
}) {
  function handleNoteSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = String(form.get("note") || "").trim();
    if (!text) return;
    onAddNote(text);
    event.currentTarget.reset();
  }

  return (
    <main className="hub-screen">
      <header className="hub-topbar">
        <div className="hub-brand"><span className="hub-brand__mark">C</span><span>CASE FILE <small>INVESTIGATION UNIT</small></span></div>
        <nav className="hub-nav" aria-label="Investigation navigation">
          <span className="hub-nav__active">MURDERBOARD</span>
          <button onClick={onAccuse}>ACCUSE</button>
        </nav>
        <span className="hub-session"><i /> INVESTIGATION ACTIVE</span>
      </header>

      <section className="hub-heading">
        <div>
          <span className="eyebrow"><span>01</span> CASE OVERVIEW</span>
          <h1>The murderboard</h1>
        </div>
        <p>Review the people and details gathered so far.<br />Select a suspect to begin an interrogation.</p>
      </section>

      <div className="hub-layout">
        <section className="murderboard-panel" aria-labelledby="board-title">
          <div className="panel-heading">
            <div><span className="eyebrow">INVESTIGATION BOARD</span><h2 id="board-title">Connections</h2></div>
            <span className="board-count">{String(boardItems.length).padStart(2, "0")} ITEMS</span>
          </div>

          <div className="board-surface">
            <div className="board-grid" aria-hidden="true" />
            <div className="board-watermark">CASE<br />001</div>
            {boardItems.length === 0 ? (
              <div className="board-empty">
                <span className="empty-symbol">✳</span>
                <strong>Your board is ready</strong>
                <p>Add an evidence card, write a note, or pin a chat excerpt as you investigate.</p>
              </div>
            ) : (
              <div className="board-items">
                {boardItems.map((item) => <BoardCard key={item.id} item={item} />)}
              </div>
            )}
            <form className="note-entry" onSubmit={handleNoteSubmit}>
              <label htmlFor="hub-note">ADD A NOTE</label>
              <div><input id="hub-note" name="note" placeholder="Write an observation…" maxLength={180} /><button type="submit" aria-label="Add note">＋</button></div>
            </form>
          </div>

          <section className="evidence-tray" aria-labelledby="evidence-title">
            <div className="tray-heading"><h3 id="evidence-title">Evidence cards</h3><span>PLACE ON BOARD</span></div>
            <div className="evidence-list">
              {evidence.map((item) => {
                const added = boardItems.some((boardItem) => boardItem.sourceId === item.id);
                return (
                  <article className={`evidence-card${added ? " evidence-card--added" : ""}`} key={item.id}>
                    <span className="evidence-card__icon">▤</span>
                    <div><strong>{item.title}</strong><p>{item.description}</p></div>
                    <button disabled={added} onClick={() => onAddEvidence(item.id)} aria-label={added ? `${item.title} is on the board` : `Add ${item.title} to board`}>{added ? "ON BOARD" : "＋ ADD"}</button>
                  </article>
                );
              })}
            </div>
          </section>
        </section>

        <aside className="hub-sidebar">
          <section className="suspect-panel" aria-labelledby="suspects-title">
            <div className="panel-heading panel-heading--compact">
              <div><span className="eyebrow">PEOPLE OF INTEREST</span><h2 id="suspects-title">Suspects</h2></div>
              <span className="board-count">03</span>
            </div>
            <div className="suspect-list">
              {suspects.map((suspect, index) => (
                <button className="suspect-card" onClick={() => onOpenInterrogation(suspect.id)} key={suspect.id}>
                  <span className={`suspect-avatar suspect-avatar--${suspect.tone}`} aria-hidden="true">{suspect.initials}</span>
                  <span className="suspect-card__copy"><strong>{suspect.name}</strong><small>{suspect.role}</small></span>
                  <span className="suspect-card__index">0{index + 1}</span>
                  <span className="suspect-card__arrow" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <p className="panel-hint">Choose someone to question. Each conversation is saved separately.</p>
          </section>

          <section className="hub-quicklinks">
            <span className="eyebrow">CASE TOOLS</span>
            <button onClick={onAccuse}><span>Make an accusation</span><b>→</b></button>
            <p>Review your board before making a decision.</p>
          </section>
        </aside>
      </div>
      <footer className="hub-footer"><span>CASE FILE <b>001</b></span><span>ALL NOTES AND CONVERSATIONS ARE SAVED LOCALLY</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO TOP ↑</button></footer>
    </main>
  );
}
