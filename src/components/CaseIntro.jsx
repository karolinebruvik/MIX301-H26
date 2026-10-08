export default function CaseIntro({ onStart }) {
  return (
    <main className="intro-screen">
      <div className="intro-topbar">
        <a className="wordmark" href="#" aria-label="Case file home">
          <span className="wordmark-mark">C</span>
          <span>CASE FILE <small>INVESTIGATION UNIT</small></span>
        </a>
        <span className="topbar-status"><i /> FIELD MODE READY</span>
      </div>

      <section className="intro-layout" aria-labelledby="intro-title">
        <div className="intro-copy">
          <div className="eyebrow"><span>01</span> CASE INTRODUCTION</div>
          <h1 id="intro-title">Every detail<br /><em>has a story.</em></h1>
          <p className="intro-description">
            Review the case, question the people involved, and connect the
            evidence on your board.
          </p>
          <button className="primary-button" onClick={onStart}>
            <span>Start investigation</span><span aria-hidden="true">↗</span>
          </button>
          <div className="intro-footnote"><span>01 / 04</span><span>YOUR CASE BEGINS HERE</span></div>
        </div>

        <div className="intro-art" aria-label="Case file preview">
          <div className="art-grain" />
          <div className="art-sheen" />
          <div className="art-label"><span>CASE FILE</span><span>UNCLASSIFIED</span></div>
          <div className="art-focus">
            <div className="focus-ring" />
            <div className="focus-line" />
            <div className="focus-stamp">OPEN<br />CASE</div>
          </div>
          <div className="art-caption">
            <span>INVESTIGATION SERIES</span>
            <strong>CASE<br />NO. 001</strong>
          </div>
          <span className="art-coordinate">ARCHIVE / 001—A</span>
        </div>
      </section>

      <footer className="intro-footer">
        <span>AN INTERACTIVE MYSTERY</span>
        <span>DESIGNED FOR CLOSE OBSERVATION</span>
        <span>DESKTOP EDITION <b>●</b></span>
      </footer>
    </main>
  );
}
