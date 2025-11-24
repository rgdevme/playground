# [MobX 🔗](mobx.js.org)

State management api with a focus on reactivity and simplicity. It's:
- Unopinionated
- Signal based

It manages state through classes with properties as state, methods as actions, and getters as derivations (computed state and reactions). 

## Key takeaways:

- **Everything that might change** over time, should be an **observable**.
- **Everthing that mutates an observable**, should be an **action**.
- **Anything value that depends on the current state** should be a **computed** value. 
- When using react, wrap components that would react to state changes with the **`observer()` HOC**, to turn them into a derivations (reactions).
- **Reactivity** occurs based on [**tracked property names**.](https://mobx.js.org/understanding-reactivity.html), which means that while a variable's properties are boserved, the variable itself might not be.
- **Any other side-effects to state** that do not produce a value, can be implemented through **reactions**.
  > *MobX reocmends to use the reactions api (autorun, reaction, and when) sparingly, as better alternatives are usually provided in framework dedicated sdks, like @mobx/mobx-react*