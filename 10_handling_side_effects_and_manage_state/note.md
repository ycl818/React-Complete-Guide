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

* Managing more Complex State with Reducers
* Managing App-Wide or Component-Wide State with Context
