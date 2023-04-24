import React from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";

const AddUser = () => {
  const adduUserHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Card>
      <form onSubmit={adduUserHandler}>
        <label htmlFor="username">UserName</label>
        <input id="username" type="text" />
        <label htmlFor="age">Age(Years)</label>
        <input id="age" type="number" />
        <button type="submit">Add User</button>
      </form>
    </Card>
  );
};

export default AddUser;
