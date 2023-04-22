import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = ({ filteredByYearArray }) => {
  if (filteredByYearArray.length === 0) {
    return <p className="expenses-list__fallback">No expense found.</p>;
  }

  return (
    <ul className="expenses-list">
      {filteredByYearArray.map((item) => (
        <ExpenseItem
          key={item.id}
          title={item.title}
          amount={item.amount}
          date={item.date}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
