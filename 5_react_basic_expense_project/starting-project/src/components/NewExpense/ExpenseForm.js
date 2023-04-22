import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ onSaveExpenseData, onCancel }) => {
  const [inputs, setInputs] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });
  const changeHandler = (e) => {
    // if (e.target.name === "enteredDate") {
    //   setInputs((prev) => {
    //     return {
    //       ...prev,
    //       [e.target.name]: new Date(e.target.value),
    //     };
    //   });
    // } else {
    //   setInputs((prev) => {
    //     return {
    //       ...prev,
    //       [e.target.name]: e.target.value,
    //     };
    //   });
    // }
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newInputs = {
      title: inputs.enteredTitle,
      amount: +inputs.enteredAmount,
      date: new Date(inputs.enteredDate),
    };
    onSaveExpenseData(newInputs);
    setInputs({
      enteredTitle: "",
      enteredAmount: "",
      enteredDate: "",
    });
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            name="enteredTitle"
            type="text"
            value={inputs.enteredTitle}
            onChange={changeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            name="enteredAmount"
            type="number"
            min="0.01"
            step="0.01"
            value={inputs.enteredAmount}
            onChange={changeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            name="enteredDate"
            type="date"
            min="2019-01-01"
            max="2023-12-31"
            onChange={changeHandler}
            value={inputs.enteredDate}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Add expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
