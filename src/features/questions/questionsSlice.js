import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion } from "../../utils/_DATA";

const initialState = {
  questions: {},
  status: "idle",
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
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
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Add any fetched posts to the array
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
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

export const { questionVote, updateQuestionVote } = questionsSlice.actions;

export default questionsSlice.reducer;

export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
  const response = await _getQuestions();
  console.log("fetchQuestions API response: ", response);
  return response;
});

export const saveNewQuestion = createAsyncThunk("questions/saveNewQuestion", async (question) => {
  const response = await _saveQuestion(question);
  console.log("saveNewQuestion API response: ", response);
  return response;
});

export const selectAllQuestions = (state) => state.questions.questions;

export const getStatusQuestions = (state) => state.questions.status;

export const allQuestionsAsArray = (state) => {
  const questions = selectAllQuestions(state);
  return Object.keys(questions).map((key) => questions[key]);
};
