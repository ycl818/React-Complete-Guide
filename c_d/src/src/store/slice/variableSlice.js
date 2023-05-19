import { createSlice, nanoid } from "@reduxjs/toolkit";

const variableSlice = createSlice({
  name: "variables",
  initialState: {
    variableArray: [],
  },
  reducers: {
    loadUploadVariable: (state, action) => {
      state.variableArray = action.payload.variableArray;
    },
    fetchExistDashboardVariable: (state, action) => {
      console.log(action.payload.data);
      state.variableArray = action.payload.variableArray;
    },
    addVariable: (state, action) => {
      console.log(action.payload);
      state.variableArray.push({
        variableName: action.payload.inputs.variableName,
        defaultValue: action.payload.inputs.defaultValue,
        id: nanoid(),
      });
    },
    adjustVariable: (state, action) => {
      state.variableArray = action.payload.inputs;
    },
    updateTargetVariable: (state, action) => {
      const variableArrayIndex = state.variableArray.findIndex(
        (array) => array?.variableName === action.payload.newRow.variableName
      );
      state.variableArray[variableArrayIndex].defaultValue =
        action.payload.newRow.defaultValue;
    },
    removeVariable: (state, action) => {
      const updated = state.variableArray.filter(
        (variable) => variable.variableName !== action.payload.target
      );

      state.variableArray = updated;
    },
  },
});

export const {
  addVariable,
  adjustVariable,
  updateTargetVariable,
  fetchExistDashboardVariable,
  loadUploadVariable,
  removeVariable,
} = variableSlice.actions;
export const variableReducer = variableSlice.reducer;
