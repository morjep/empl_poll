import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion } from "../utils/_DATA";
import { _getUsers, _saveQuestionAnswer } from "../utils/_DATA";

const initialState = {
  questions: {},
  users: {},
  authedUser: null,
  statusUsersAPI: "idle",
  statusQuestionsAPI: "idle",
  error: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateQuestionVote: (state, action) => {
      const { authedUser, qid, answer } = action.payload;
      if (answer === "optionOne") {
        state.questions[qid].optionOne.votes.push(authedUser);
      }
      if (answer === "optionTwo") {
        state.questions[qid].optionTwo.votes.push(authedUser);
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
        }
      });
  },
});

export const { questionVote, updateQuestionVote } = appSlice.actions;

export default appSlice.reducer;

export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
  const response = await _getQuestions();
  console.log("_getQuestions() API response: ", response);
  return response;
});

export const saveNewQuestion = createAsyncThunk("questions/saveNewQuestion", async (question) => {
  const response = await _saveQuestion(question);
  console.log("_saveQuestion() API response: ", response);
  return response;
});

export const selectAllQuestions = (state) => state.app.questions;

export const getStatusQuestions = (state) => state.app.statusQuestionsAPI;

export const allQuestionsAsArray = (state) => {
  const questions = selectAllQuestions(state);
  return Object.keys(questions).map((key) => questions[key]);
};
