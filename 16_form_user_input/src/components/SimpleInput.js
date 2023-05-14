import { useState, useRef } from "react";
const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameisValid] = useState(true);

  const nameInputRef = useRef();

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

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

  const InputClasses = enteredNameIsValid
    ? "form-control"
    : "form-control invalid";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={InputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
        />
        {!enteredNameIsValid && (
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
