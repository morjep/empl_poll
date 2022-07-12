import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers, _saveQuestionAnswer } from "../../utils/_DATA";

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
      })
      .addCase(saveUserAnswer.fulfilled, (state, action) => {
        if (action) {
          const { authedUser, qid, answer } = action.payload;
          state.users[authedUser].answers[qid] = answer;
        }
      });
  },
});

export const { login, logout } = usersSlice.actions;
export default usersSlice.reducer;

/* Async below here */

// Thunk for fetching all user
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await _getUsers();
  console.log("fetchUsers API response: ", response);
  return response;
});

// Thunk for saving user answer
export const saveUserAnswer = createAsyncThunk("users/saveUserAnswer", async (payload) => {
  const { authedUser, qid, answer } = payload;
  const response = await _saveQuestionAnswer({ authedUser, qid, answer });
  console.log("saveUserAnswer API response: ", response);
  if (response) {
    return payload;
  }
  return null;
});

/*  Selectors below here */
export const getStatusUsers = (state) => state.users.status;

export const getAuthedUser = (state) => state.users.authedUser;

export const getAnswers = (state) => {
  const authedUser = getAuthedUser(state);
  const authedUserObject = state.users.users[authedUser];
  return authedUserObject.answers;
};

export const getAnsweredQuestionsAsArray = (state) => {
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
