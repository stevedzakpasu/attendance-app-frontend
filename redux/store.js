import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./features/slices/eventSlice";
import memberSlice from "./features/slices/memberSlice";

export const store = configureStore({
  reducer: {
    event: eventSlice,
    member: memberSlice,
  },
});
