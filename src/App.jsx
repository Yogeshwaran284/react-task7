import { createContext, useContext, useReducer } from "react";
import "./App.css";

// 1. CREATE CONTEXT
const CounterContext = createContext();

// 2. CREATE REDUCER
const initialState = { count: 0 };

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

// 3. CHILD COMPONENTS - Using useContext (No props drilling)

// Component to display count
function CounterDisplay() {
  const { state } = useContext(CounterContext);
  return (
    <div className="count-box">
      <h1>{state.count}</h1>
      <p>Current Count Value</p>
    </div>
  );
}

// Component for Buttons
function CounterButtons() {
  const { dispatch } = useContext(CounterContext);
  return (
    <div className="btn-group">
      <button className="btn decrement" onClick={() => dispatch({ type: "DECREMENT" })}>
        - Decrement
      </button>
      <button className="btn reset" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
      <button className="btn increment" onClick={() => dispatch({ type: "INCREMENT" })}>
        + Increment
      </button>
    </div>
  );
}

// Main Counter Component
function Counter() {
  return (
    <div className="counter-card">
      <h2>Counter App</h2>
      <p className="info">State shared via useContext + useReducer</p>
      <CounterDisplay />
      <CounterButtons />
      <div className="code-info">
        <p>Action dispatched: <span>INCREMENT / DECREMENT / RESET</span></p>
      </div>
    </div>
  );
}

// 4. MAIN APP WITH PROVIDER
function App() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <div className="container">
          <h1 className="main-title">Task 7 - useContext & useReducer</h1>
          <Counter />
        </div>
      </div>
    </CounterContext.Provider>
  );
}

export default App;