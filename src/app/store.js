import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./usersSlice";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    app: appReducer,
  },
});
