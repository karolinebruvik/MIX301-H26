import { useState } from "react";
import Accusation from "./components/Accusation.jsx";
import CaseIntro from "./components/CaseIntro.jsx";
import InterrogationRoom from "./components/InterrogationRoom.jsx";
import MainHub from "./components/MainHub.jsx";
import Result from "./components/Result.jsx";
import getSuspectReply from "./services/getSuspectReply.js";
import { EVIDENCE, SUSPECTS } from "./data/mock.js";

function clockTime() {
  return new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [selectedSuspectId, setSelectedSuspectId] = useState(null);
  const [accusedSuspectId, setAccusedSuspectId] = useState(null);
  const [boardItems, setBoardItems] = useState([]);
  const [conversations, setConversations] = useState({});

  function addNote(text) {
    setBoardItems((items) => [...items, {
      id: `note-${crypto.randomUUID()}`,
      type: "note",
      title: "Investigator note",
      text,
    }]);
  }

  function addEvidence(evidenceId) {
    const evidence = EVIDENCE.find((item) => item.id === evidenceId);
    if (!evidence) return;
    setBoardItems((items) => {
      if (items.some((item) => item.sourceId === evidenceId)) return items;
      return [...items, {
        id: `board-${evidenceId}`,
        sourceId: evidenceId,
        type: "evidence",
        title: evidence.title,
        text: evidence.description,
      }];
    });
  }

  function sendMessage(text) {
    if (!selectedSuspectId) return;
    const playerMessage = { id: crypto.randomUUID(), role: "player", text, time: clockTime() };
    const reply = { id: crypto.randomUUID(), role: "suspect", text: getSuspectReply(selectedSuspectId, text), time: clockTime() };
    setConversations((history) => ({
      ...history,
      [selectedSuspectId]: [...(history[selectedSuspectId] || []), playerMessage, reply],
    }));
  }

  function pinMessage(message) {
    if (!selectedSuspectId) return;
    const suspect = SUSPECTS.find((item) => item.id === selectedSuspectId);
    setBoardItems((items) => {
      if (items.some((item) => item.sourceId === message.id)) return items;
      return [...items, {
        id: `pin-${message.id}`,
        sourceId: message.id,
        type: "pinned-message",
        title: message.role === "player" ? "Your message" : `Reply from ${suspect.name}`,
        text: message.text,
        sourceSuspectName: suspect.name,
      }];
    });
  }

  if (screen === "intro") {
    return <CaseIntro onStart={() => setScreen("hub")} />;
  }

  if (screen === "hub") {
    return (
      <MainHub
        suspects={SUSPECTS}
        evidence={EVIDENCE}
        boardItems={boardItems}
        onAddNote={addNote}
        onAddEvidence={addEvidence}
        onOpenInterrogation={(suspectId) => {
          setSelectedSuspectId(suspectId);
          setScreen("interrogation");
        }}
        onAccuse={() => setScreen("accusation")}
      />
    );
  }

  if (screen === "interrogation") {
    const suspect = SUSPECTS.find((item) => item.id === selectedSuspectId) || SUSPECTS[0];
    const messages = conversations[suspect.id] || [];
    const pinnedMessageIds = new Set(boardItems.filter((item) => item.type === "pinned-message").map((item) => item.sourceId));
    return (
      <InterrogationRoom
        suspect={suspect}
        suspects={SUSPECTS}
        messages={messages}
        pinnedMessageIds={pinnedMessageIds}
        onSendMessage={sendMessage}
        onSelectSuspect={setSelectedSuspectId}
        onPinToBoard={pinMessage}
        onShowHint={() => {}}
        onReturnToHub={() => setScreen("hub")}
      />
    );
  }

  if (screen === "accusation") {
    return (
      <Accusation
        suspects={SUSPECTS}
        onAccuse={(suspectId) => {
          setAccusedSuspectId(suspectId);
          setScreen("result");
        }}
        onCancel={() => setScreen("hub")}
      />
    );
  }

  const accusedSuspect = SUSPECTS.find((item) => item.id === accusedSuspectId);
  return <Result suspect={accusedSuspect} onReturnToHub={() => setScreen("hub")} />;
}
