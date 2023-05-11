import React, { useCallback, useState } from "react";
import Button from "./components/UI/Button/Button";
import "./App.css";
import DemoOutput from "./components/UI/Button/Demo/DemoOutput";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prevState) => !prevState);
    }
  }, [allowToggle]);

  const allowParagraphToggleHandler = useCallback(() => {
    setAllowToggle(true);
  }, []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowParagraphToggleHandler} num={1}>
        Allow
      </Button>
      <Button onClick={toggleParagraphHandler} num={2}>
        Toggle paragraph
      </Button>
    </div>
  );
}

export default App;
