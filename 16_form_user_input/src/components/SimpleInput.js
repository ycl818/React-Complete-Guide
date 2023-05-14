import { useState, useRef } from "react";
const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameisValid] = useState(false);
  const [enterNameTouched, setEnterNameTouched] = useState(false);

  const nameInputRef = useRef();

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnterNameTouched(true); // user has confirmed all inputs

    if (enteredName === "") {
      setEnteredNameisValid(false);
      return;
    }

    setEnteredNameisValid(true);
    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;
    // nameInputRef.current.value = "";  => Not IDEAL, Don't manipulate the DOM
    console.log(
      "🚀 ~ file: SimpleInput.js:16 ~ formSubmissionHandler ~ enteredValue:",
      enteredValue
    );
  };

  const nameInputIsInvalid = !enteredNameIsValid && enterNameTouched;

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control ";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
