import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../../utils/_DATA";

const initialState = {
  users: {},
  authedUser: null,
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.authedUser = null;
    },
    login: (state, action) => {
      const { name, pwd } = action.payload;
      const user = state.users[name];
      if (user && user.password === pwd) {
        state.authedUser = user.id;
      }
      if (!user) {
        state.error = "User not found";
      }
      // state.authedUser = "sarahedo";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Add any fetched posts to the array
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { login, logout } = usersSlice.actions;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await _getUsers();
  console.log("Users API response: ", response);
  return response;
});

export const getStatusUsers = (state) => state.users.status;

export const getAuthedUser = (state) => state.users.authedUser;

export const getAnsweredQuestions = (state) => {
  const authedUser = getAuthedUser(state);
  const authedUserObject = state.users.users[authedUser];
  return Object.keys(authedUserObject.answers);
};

export const getUserName = (state) => {
  const authedUser = state.users.authedUser;
  const users = state.users.users;
  const user = users[authedUser];
  if (user) {
    const userName = user.name;
    const avatarURL = user.avatarURL;
    return { userName, avatarURL };
  }
  return { userName: "", avatarURL: "" };
};

export const getUserError = (state) => state.users.error;

export default usersSlice.reducer;