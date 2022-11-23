import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://ug-attendance-app.herokuapp.com/api/events/";

export const getEvents = createAsyncThunk("events/getEvents", async () => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.log(error));
});

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    loading: false,
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = true;
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setEvents } = eventSlice.actions;

export default eventSlice.reducer;
