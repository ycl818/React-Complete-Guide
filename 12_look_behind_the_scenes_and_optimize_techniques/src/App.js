import React, { useState } from "react";
import Button from "./components/UI/Button/Button";
import "./App.css";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  return (
    <div className="app">
      <h1>Hi there!</h1>
      {showParagraph && <p>here is paragraph</p>}
      <Button
        onClick={() => {
          setShowParagraph((prevState) => !prevState);
        }}
      >
        Toggle paragraph
      </Button>
    </div>
  );
}

export default App;
