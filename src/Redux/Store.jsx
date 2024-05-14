import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import reducer from "../Redux/reducers/reducer";

// Persist Redux state to local storage after each action
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.error("Error saving state to localStorage:", e);
  }
}

// Retrieve Redux state from local storage when the application initializes
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error loading state from localStorage:", e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

// Apply Redux Thunk middleware to handle async actions
const store = createStore(reducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
