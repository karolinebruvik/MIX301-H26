export default function Result({ suspect, onReturnToHub }) {
  return (
    <main className="decision-screen result-screen">
      <header className="interrogation-topbar">
        <span className="interrogation-case-label"><span className="hub-brand__mark">C</span><span>CASE FILE <small>INVESTIGATION RESULT</small></span></span>
        <span className="hub-session"><i /> CASE FILE / 001</span>
      </header>
      <section className="result-content">
        <span className="result-seal" aria-hidden="true">01</span>
        <span className="eyebrow">ACCUSATION RECORDED</span>
        <h1>{suspect?.name || "Suspect"}</h1>
        <p className="result-summary">Your accusation has been recorded.</p>
        <p className="result-placeholder">Placeholder outcome. The case result will appear here when the mystery content is ready.</p>
        <button className="primary-button" onClick={onReturnToHub}><span>Return to murderboard</span><span aria-hidden="true">↗</span></button>
      </section>
    </main>
  );
}
