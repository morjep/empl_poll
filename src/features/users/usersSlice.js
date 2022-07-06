import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../../utils/_DATA";

const initialState = {
  users: {},
  authedUser: "sarahedo",
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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

export default usersSlice.reducer;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await _getUsers();
  console.log("Users API response: ", response);
  return response;
});

export const getStatusUsers = (state) => state.users.status;
