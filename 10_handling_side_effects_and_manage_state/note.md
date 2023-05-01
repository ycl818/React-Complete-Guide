- Working with (Side) Effect
  1. Main job: Render UI & React to User Input
  - Evaluate & Render JSX
  - Manage State & Props
  - React to (User) Events & Input
  - Re-evaluate Component upon State & Prop Changes
    This all is "back into" React via the "tools" and features (useState() Hook, Props etc)
  2. Side Effect : Anything Else
  - Store Data in Browser Storage
  - Send Http Request to Backend Servers
  - Set & Manage Timers
    These tasks **must happen outside of the normal component evaluation** and render cycle - especially since they might block/delay rendering(e.g. Http request)

---

- useEffect (() => {}, [ dependencies ])
  - front function: A function that should be executed AFTER every component evaluation IF the specified dependencies changed
  - Your side effect code goes into this function
  - Dependencies of this effect, the function only runs if the dependencies changed, specify your dependencies of your function here
  -
  - You DON'T need to add state updating functions; React guarantees that those functions never change, hence you don't need to add them as dependencies (you could though)
  - You also DON'T need to add "built-in" APIs or functions like fetch(), localStorage etc (functions and features built-into the browser and hence available globally): These browser APIs / global functions are not related to the React component render cycle and they also never change
  - You also DON'T need to add variables or functions you might've defined OUTSIDE of your components (e.g. if you create a new helper function in a separate file): Such functions or variables also are not created inside of a component function and hence changing them won't affect your components (components won't be re-evaluated if such variables or functions change and vice-versa)

* Managing more Complex State with Reducers

  - Sometimes, you have **more complex state** - for example if it got **multiple states, multiple ways of changing** it or **dependencies** to other states
  - useState() then often **becomes hard or error-prone to use** - it's easy to write bad, inefficient or buggy code in such scenarios
  - useReducer() can be used as a **replacement** for useState() if you need **more powerful** state management

* Managing App-Wide or Component-Wide State with Context
  - Component-wide, "behind-the-scenes" State Storage
  - useContext
  -
* Context Limitations
  - React Context is **Not optimized** for high frequency changes!
  - React Context also **shouldn't be used to replace ALL** component communications and props
  - Component should still be configurable via props and short "prop chain" might not need any replacement
