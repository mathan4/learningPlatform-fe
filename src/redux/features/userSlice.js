import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  location: "",
  languagesKnown: [],
  profilePicture: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      return { ...state, ...action.payload }; // Updates entire profile
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setLanguagesKnown: (state, action) => {
      state.languagesKnown = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    clearUserProfile: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setUserProfile,
  setFirstName,
  setLastName,
  setLocation,
  setLanguagesKnown,
  setProfilePicture,
  clearUserProfile,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
