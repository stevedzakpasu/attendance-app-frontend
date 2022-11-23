import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://ug-attendance-app.herokuapp.com/api/members_cards/";

export const getMembers = createAsyncThunk("members/getMembers", async () => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.log(error));
});

const memberSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
    loading: false,
  },
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.loading = true;
        state.members = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setMembers } = memberSlice.actions;

export default memberSlice.reducer;
