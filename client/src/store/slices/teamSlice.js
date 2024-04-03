import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teamUsers: [],
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addToTeam: (state, action) => {
      const user = state.teamUsers.find(
        (user) => user._id === action.payload._id
      );

      if (!user) {
        state.teamUsers.push(action.payload);
      }

      // if (user) {
      //   state.teamUsers = state.teamUsers.filter(
      //     (user) => user._id !== action.payload._id
      //   );
      // } else {
      //   state.teamUsers.push(action.payload);
      // }
    },

    removeToTeam: (state, action) => {
      state.teamUsers = state.teamUsers.filter(
        (user) => user._id !== action.payload._id
      );
    },
  },
});

export const { addToTeam, removeToTeam } = teamSlice.actions;

export default teamSlice.reducer;
