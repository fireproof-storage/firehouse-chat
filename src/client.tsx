import "./styles.css";
import usePartySocket from "partysocket/react";
import { createRoot } from "react-dom/client";

function App() {
  usePartySocket({
    room: "example-room",
    onMessage(evt) {
      console.log("Received message:", evt.data);
    },
  });
  return <h1>🎈 Welcome to PartyKit!</h1>;
}

createRoot(document.getElementById("app")!).render(<App />);
