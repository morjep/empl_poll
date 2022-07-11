import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions } from "../../utils/_DATA";

const initialState = {
  questions: {},
  status: "idle",
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    // TODO: Must persist on 'backend'
    questionVote: (state, action) => {
      const { questionId, author, option } = action.payload;
      if (option === "optionOne") {
        state.questions[questionId].optionOne.votes.push(author);
      }
      if (option === "optionTwo") {
        state.questions[questionId].optionTwo.votes.push(author);
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
      });
  },
});

export const { questionVote } = questionsSlice.actions;

export default questionsSlice.reducer;

export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
  const response = await _getQuestions();
  console.log("Questions API response: ", response);
  return response;
});

export const selectAllQuestions = (state) => state.questions.questions;

export const getStatusQuestions = (state) => state.questions.status;

export const allQuestionsAsArray = (state) => {
  const questions = selectAllQuestions(state);
  return Object.keys(questions).map((key) => questions[key]);
};
