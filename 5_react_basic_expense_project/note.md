React is all about "Components"

React allows you to create re-useable and reactive components consisiting of HTML and JavaScript (and CSS)

- Deacalrative Approach

Define the desired target state(s) and let React figure out the actual javaScript DOM instructions

if your state update depends on the previous state use this function form: setState((prevState) => {return {...prevState, enteredTitle: event.target.value}})

- Lifting State Up
