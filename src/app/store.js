import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import questionsReducer from "../features/questions/questionsSlice";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
  },
});
