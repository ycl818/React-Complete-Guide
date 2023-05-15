import { createStore } from "redux";

const initialState = { counter: 0, showCounter: true };
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }

  if (action.type === "increase") {
    return {
      ...state,
      counter: state.counter + action.amount,
    };
  }

  if (action.type === "decrement") {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }

  if (action.type === "toggle") {
    console.log(state);
    console.log(action);
    return {
      ...state,
      showCounter: !state.showCounter,
    };
  }

  return state;
};

const store = createStore(counterReducer); // wants a pointer at reducer

export default store;
