import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion, _getUsers, _saveQuestionAnswer } from "../utils/_DATA";

const initialState = {
  questions: {},
  users: {},
  authedUser: null,
  authStatus: null,
  statusUsersAPI: "idle",
  statusQuestionsAPI: "idle",
  error: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    logout: (state) => {
      state.authedUser = null;
      state.authStatus = null;
    },
    login: (state, action) => {
      const { name, pwd } = action.payload;
      const user = state.users[name];
      if (user && user.password === pwd) {
        state.authedUser = user.id;
        state.authStatus = "User authenticated";
      }
      if (state.authedUser === null) {
        state.authStatus = "User not found";
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.statusQuestionsAPI = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.statusQuestionsAPI = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.statusQuestionsAPI = "failed";
        state.error = action.error.message;
      })
      .addCase(saveNewQuestion.fulfilled, (state, action) => {
        if (action.payload) {
          const question = action.payload;
          state.questions[question.id] = question;
          state.users[state.authedUser].questions.push(question.id);
        }
      })
      .addCase(fetchUsers.pending, (state, action) => {
        state.statusUsersAPI = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.statusUsersAPI = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.statusUsersAPI = "failed";
        state.error = action.error.message;
      })
      .addCase(saveUserAnswer.fulfilled, (state, action) => {
        if (action) {
          const { authedUser, qid, answer } = action.payload;
          state.users[authedUser].answers[qid] = answer;

          if (answer === "optionOne") {
            state.questions[qid].optionOne.votes.push(authedUser);
          }
          if (answer === "optionTwo") {
            state.questions[qid].optionTwo.votes.push(authedUser);
          }
        }
      });
  },
});

export const { questionVote, updateQuestionVote, login, logout, updateUserNewQuestion } =
  appSlice.actions;

export default appSlice.reducer;

/* Async below here */

// Thunk for fetching all questions
export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
  const response = await _getQuestions();
  console.log("_getQuestions() API response: ", response);
  return response;
});

// Thunk for saving a new question
export const saveNewQuestion = createAsyncThunk("questions/saveNewQuestion", async (question) => {
  const response = await _saveQuestion(question);
  console.log("_saveQuestion() API response: ", response);
  return response;
});

// Thunk for fetching all user
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await _getUsers();
  console.log("_getUsers() API response: ", response);
  return response;
});

// Thunk for saving user answer
export const saveUserAnswer = createAsyncThunk("users/saveUserAnswer", async (payload) => {
  const { authedUser, qid, answer } = payload;
  const response = await _saveQuestionAnswer({ authedUser, qid, answer });
  console.log("_saveQuestionAnswer() API response: ", response);
  if (response) {
    return payload;
  }
  return null;
});

/*  Selectors below here */
export const getAuthedUser = (state) => state.app.authedUser;
export const authStatus = (state) => state.app.authStatus;

export const getStatusUsers = (state) => state.app.statusUsersAPI;
export const getStatusQuestions = (state) => state.app.statusQuestionsAPI;

export const getAnswers = (state) => {
  const authedUser = getAuthedUser(state);
  const authedUserObject = state.app.users[authedUser];
  return authedUserObject.answers;
};

export const selectAllQuestions = (state) => state.app.questions;

export const allQuestionsAsArray = (state) => {
  const questions = selectAllQuestions(state);
  return Object.keys(questions).map((key) => questions[key]);
};

export const getAnsweredQuestionsAsArray = (state) => {
  const authedUser = getAuthedUser(state);
  const authedUserObject = state.app.users[authedUser];
  return Object.keys(authedUserObject.answers);
};

export const userInfo = (state) => {
  const authedUser = state.app.authedUser;
  const users = state.app.users;
  const user = users[authedUser];
  if (user) {
    const userName = user.name;
    const avatarURL = user.avatarURL;
    return { userName, avatarURL };
  }
  return { userName: "", avatarURL: "" };
};

export const userStatsArraySorted = (state) => {
  const users = state.app.users;
  let userStats = Object.keys(users).map((key) => {
    const questions = users[key].questions;
    const answers = users[key].answers;
    return {
      user: users[key].id,
      questions: questions.length,
      answers: Object.keys(answers).length,
      score: questions.length + Object.keys(answers).length,
    };
  });
  userStats = userStats.sort((a, b) => b.score - a.score);
  return userStats;
};
